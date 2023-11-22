export const errorHandler = (errorCode: string) => {
    switch (errorCode) {
        case 'auth/email-already-in-use':
            console.error('El correo electrónico ya está en uso por otro usuario.')
            break;
        case 'auth/invalid-email':
            console.error('El formato del correo electrónico es inválido.')
            break;
        case 'auth/user-not-found':
            console.error('No hay ningún usuario registrado con ese correo electrónico.')
            break;
        case 'auth/wrong-password':
            console.error('La contraseña proporcionada no es válida.')
            break;
        case 'auth/weak-password':
            console.error('La contraseña proporcionada no cumple con los requisitos de seguridad mínimos.')
            break;
        case 'auth/network-request-failed':
            console.error('Error de red, por ejemplo, cuando no hay conexión a Internet.')
            break;
        case 'auth/too-many-requests':
            console.error('Demasiados intentos fallidos de inicio de sesión. El usuario está temporalmente bloqueado.')
            break;
    }
}