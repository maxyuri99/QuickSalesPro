import { Header } from "../Header"

export const DefaultTemplate = ({ children }) => {
    return (
        <div className="background">
            <Header children={children}/>
        </div>
    )
}