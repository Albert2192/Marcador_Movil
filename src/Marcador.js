import { Camera } from 'expo-camera/legacy';
import { useState, useRef } from 'react';
import { Button, StyleSheet, Text, TouchableOpacity, View, ImageBackground, TextInput } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useNavigation } from '@react-navigation/native';
import Config from '../Config/Config';

const [URL_SERVER] = Config;

export default function Marcador() {

    const navigation = useNavigation();

    const [facing, setFacing] = useState(Camera.Constants.Type.front);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const cameraRef = useRef(null);
    const inputRef = useRef(null);
    const [inputValue, setInputValue] = useState('');

    if (!permission) {
        // Camera permissions are still loading.
        return <View />;
    }

    if (!permission.granted) {
        // Camera permissions are not granted yet.
        return (
            <View style={[styles.container, { justifyContent: "center", alignItems: "center", }]}>
                <FontAwesome name="camera" size={30} color="black" />
                <Text style={{ textAlign: 'center', marginTop: 8, marginBottom: 15, }}>Necesitamos permiso para utilizar la cámara.</Text>
                <Button onPress={requestPermission} title="Permitir cámara" />
            </View>
        );
    }

    /* ESTA FUNCION CAMBIA DE LA CAMARA TRASERA A LA DELANTER */
    function toggleCameraFacing() {
        setFacing(current => (current === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back));
    }

    /* FUNCION QUE CAPTURA LA IMAGEN */
    async function captureImage() {
        if (cameraRef.current) {
            /* const photo = await cameraRef.current.takePictureAsync(); */
            const photo = await cameraRef.current.takePictureAsync({ base64: true });
            /* console.log(photo); */
            uploadImage(photo);
            // Aquí puedes agregar el manejo de la imagen capturada
        }
    }

    /* FUNCION QUE SE EJECUTA AL PRESIONAR LOS NUMEROS */
    const handleNumberPress = (number) => {
        setInputValue(prev => prev + number);
    };

    /* FUNCION PARA RESETEAR EL CAMPO */
    const handleReset = () => {
        setInputValue('');
    };

    /* FUNCION PARA ENVIAR LOS DATOS AL SERVIDOR */
    async function uploadImage(photo) {
        const formData = new FormData();
        formData.append('photo', {
            uri: photo.uri,
            name: 'photo.jpg',
            type: 'image/jpeg'
        });

        try {
            const response = await fetch( URL_SERVER, {
                method: 'POST',
                body: formData,
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            const result = await response.json();
            console.log('Upload success:', result);
            volverInicio();
        } catch (error) {
            console.error('Upload failed:', error);
        }
    }

    setTimeout(() => {
        volverInicio();
    }, 15000);

    const volverInicio = () => {
        navigation.navigate('Inicio');
    }

    return (
        <View style={styles.container}>

            <ImageBackground
                /* source={{ uri: 'https://static.vecteezy.com/system/resources/previews/013/614/661/non_2x/abstract-computer-technology-background-with-circuit-board-and-circle-tech-illustration-vector.jpg' }} */
                source={{ uri: 'https://static.vecteezy.com/system/resources/previews/017/446/297/non_2x/modern-technology-circuit-board-texture-background-futuristic-blue-circuit-board-background-quantum-computer-technology-illustration-vector.jpg' }}
                style={styles.backgroundImage}
            >

                <View style={styles.section1}>
                    {/* <Text style={{fontSize: 20, color: "#f3f3f3", fontWeight: "bold", backgroundColor: "#154360", paddingHorizontal: 20, paddingVertical: 3, borderRadius: 3,}}>Control de Acceso.</Text> */}
                    <Camera
                        style={styles.camera}
                        type={facing}
                        ref={cameraRef}
                    >
                        <View style={styles.buttonContainer}>
                            {/* <TouchableOpacity style={styles.button} onPress={toggleCameraFacing}>
                                <Text style={styles.text}>Flip Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.button} onPress={captureImage}>
                                <Text style={styles.text}>Capture Image</Text>
                            </TouchableOpacity> */}
                        </View>
                    </Camera>
                </View>
                <View style={styles.section2}>
                    <TextInput style={styles.inputContainer} value={inputValue} ref={inputRef} editable={false}></TextInput>
                    <View style={styles.containerNumeros}>
                        <View style={styles.lineaNumero}>
                            <TouchableOpacity style={styles.numero} onPress={() => handleNumberPress('7')}>
                                <Text style={styles.texto}>7</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numero} onPress={() => handleNumberPress('8')}>
                                <Text style={styles.texto}>8</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numero} onPress={() => handleNumberPress('9')}>
                                <Text style={styles.texto}>9</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineaNumero}>
                            <TouchableOpacity style={styles.numero} onPress={() => handleNumberPress('4')}>
                                <Text style={styles.texto}>4</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numero} onPress={() => handleNumberPress('5')}>
                                <Text style={styles.texto}>5</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numero} onPress={() => handleNumberPress('6')}>
                                <Text style={styles.texto}>6</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineaNumero}>
                            <TouchableOpacity style={styles.numero} onPress={() => handleNumberPress('1')}>
                                <Text style={styles.texto}>1</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numero} onPress={() => handleNumberPress('2')}>
                                <Text style={styles.texto}>2</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numero} onPress={() => handleNumberPress('3')}>
                                <Text style={styles.texto}>3</Text>
                            </TouchableOpacity>
                        </View>
                        <View style={styles.lineaNumero}>
                            <TouchableOpacity style={[styles.numero, styles.reset]} onPress={handleReset}>
                                <FontAwesome name="times" size={24} color="#f3f3f3" />
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.numero} onPress={() => handleNumberPress('0')}>
                                <Text style={styles.texto}>0</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={[styles.numero, styles.ok]} onPress={captureImage}>
                                <FontAwesome name="check" size={24} color="#f3f3f3" />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>


            </ImageBackground>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        width: 300,
        height: 220,
    },
    buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        justifyContent: 'space-around',
        alignItems: 'flex-end',
        marginBottom: 20,
    },
    button: {
        flex: 1,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
    section1: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
        gap: 20,
    },
    section2: {
        flex: 1,
        height: "100%",
        justifyContent: "center",
        alignItems: "center",
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: "row",
        gap: 10,
    },
    containerNumeros: {
        width: "90%",
        gap: 10,
        marginVertical: 12,
    },
    lineaNumero: {
        flexDirection: "row",
        width: "100%",
        justifyContent: "space-evenly",
        gap: 10,
    },
    numero: {
        backgroundColor: "#2874A6",
        flex: 1,
        paddingVertical: 15,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 1,
        borderColor: "#fff",
    },
    reset: {
        backgroundColor: "#D32F2F",
    },
    ok: {
        backgroundColor: "#388E3C"
    },
    texto: {
        color: "#f3f3f3",
        fontSize: 18,
        fontWeight: "bold",
    },
    inputContainer: {
        fontSize: 20,
        color: "#000",
        backgroundColor: "#f3f3f3",
        width: "80%",
        paddingVertical: 4,
        textAlign: "center",
        borderRadius: 3,
        fontWeight: "bold",
    }
});
