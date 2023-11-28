import { DefaultTemplate } from "../../components/DefaultTemplate"
import { SaleListComp } from "../../components/SaleList"

export const ControleVendas = () => {
    return (
        <DefaultTemplate>
            <main className="background">
                <div className="content">
                    <SaleListComp/>
                </div>
            </main>
        </DefaultTemplate>
    )
}