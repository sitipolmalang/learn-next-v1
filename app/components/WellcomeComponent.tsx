import ButtonComponent from './client/ButtonComponent';


export default function WelcomeComponent() {
    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-500 to-purple-600">
            <div className="text-center">
                <h1 className="text-5xl font-bold text-white mb-4">
                    Welcome!
                </h1>
                <p className="text-xl text-gray-100 mb-8">
                    We're glad to have you here
                </p>

                <ButtonComponent label='Get Started' variant='primary'/>

            </div>
        </div>
    );
}