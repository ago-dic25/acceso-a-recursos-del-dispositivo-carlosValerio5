import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { estiloTextos } from './misEstilos';
import { useState, useEffect } from 'react';
import { TextInput, Button } from 'react-native';
import * as MediaLibrary from 'expo-media-library'
import { Camera, CameraType, CameraView, useCameraPermissions } from 'expo-camera'

export default function App() {
	const [permisos, setPermisos] = useState(false);
	const [foto, setFoto] = useState(null);
	const [tipoCamera, setTipoCamera] = useState('back');
	const [cameraRef, setCameraRef] = useState(null);
	const [cameraPermissions, setCameraPermissions] = useCameraPermissions();

	useEffect(()=>{
		(async () => {
			const mediaLibraryPermissions = MediaLibrary.requestPermissionsAsync();
			const status = await Camera.requestCameraPermissionsAsync();
			setPermisos(status.status === "granted");
			if (!status.granted)
				console.log("Permission needed");
		})();
	}, []);

	if (permisos == null || !permisos){
		return (
		  <View style={styles.container}>
			<Text style={estiloTextos.texto}>Permission Denied</Text>

		  </View>
		)
	}

	  const tomarFoto = async () =>{
		if(cameraRef){
		  try{
			const datosFoto = await cameraRef.takePictureAsync();
			setFoto(datosFoto.uri);
			console.log(datosFoto);
			//const asset = await MediaLibrary.createAssetAsync(datosFoto.uri);
			//console.log('foto guardada en galeria', asset);
		  }catch(error){
			console.log('error ' + error)
		  }
		}
	  }

	const onPictureSaved = () => {
		console.log(foto);
	}


  return (
	  <View style={styles.container}>
	  	<CameraView style={styles.camera} facing='front'/>
	  	<StatusBar style="auto" />
	  	<Button title='boton' color={styles.button.color} onPress={tomarFoto}/>

	  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },

	buttons: {
		display: 'flex',
		flexDirection: 'row',
		gap: 20,
		padding: 10,
	},

	inputField: {
		backgroundColor: 'hsl(0, 0%, 5%)',
		borderColor: 'hsl(0, 0%, 30%)',
		borderWidth: 1,
		color: 'hsl(0, 0%, 70%)',
	},

	button: {
		color: 'hsl(0, 0%, 10%)',
	},
	camera: {
		flex: 1,
		aspectRatio: 1
	}
	
});
