import { LoginContainerProps } from "./types"



const LoginContainer: React.FC<LoginContainerProps> = ({ children }) => {

    return(
        <div className="w-1/2 flex flex-col justify-center items-center p-10">
            {children}
        </div>
    );
}

export default LoginContainer;