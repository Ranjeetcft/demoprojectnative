import {Alert, Linking, Platform} from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';

// Open Settings for permission
const open_settings = () => {
  Alert.alert(
    'Alert',
    'This app need permissions,Please allow it',
    [
      {text: 'Close', onPress: () => {}, style: 'cancel'},
      {text: 'Open Settings', onPress: () => Linking.openSettings()},
    ],
    {cancelable: false},
  );
};

// Global function for selecting an image from the camera
const selectCameraImage = async (uploadImage, setImageUri, setMediaVisible) => {
  try {
    const image = await ImagePicker.openCamera({
      mediaType: 'photo',
      width: 400,
      height: 400,
      cropping: true,
      compressImageQuality: 0.5,
    });

    console.log('select image res ', image);
    setImageUri(image.path);

    const fileData = {
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').pop(),
    };

    console.log('fileData 125', fileData);
    const formData = new FormData();
    formData.append('file', fileData);

    uploadImage(formData);
  } catch (error) {
    setMediaVisible(false);
    console.log('ImagePicker Error: ', error);
    if (
      Platform.OS === 'ios' &&
      error === 'Error: User did not grant camera permission.'
    ) {
      setTimeout(() => open_settings(t), 1000);
    } else if (error === 'Error: User did not grant camera permission.') {
      open_settings(t);
    }
  }
};

// Global function for selecting an image from the gallery
const selectGalleryImage = async (
  uploadImage,
  setImageUri,
  setMediaVisible,
  t,
) => {
  try {
    const image = await ImagePicker.openPicker({
      width: 400,
      height: 400,
      compressImageQuality: 0.5,
    });

    console.log('select image res ', image);
    setImageUri(image.path);

    const fileData = {
      uri: image.path,
      type: image.mime,
      name: image.path.split('/').pop(),
    };

    console.log('fileData', fileData);
    const formData = new FormData();
    formData.append('file', fileData);

    uploadImage(formData);
  } catch (error) {
    setMediaVisible(false);
    console.log('ImagePicker Error: ', error);
    if (
      Platform.OS === 'ios' &&
      error ===
        'Error: Cannot access images. Please allow access if you want to be able to select images.'
    ) {
      setTimeout(() => open_settings(t), 1000);
    } else if (error === 'Error: Required permission missing') {
      open_settings(t);
    }
  }
};

export {selectCameraImage, selectGalleryImage, open_settings};
