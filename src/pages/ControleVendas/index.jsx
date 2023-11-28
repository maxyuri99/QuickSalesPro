import { DefaultTemplate } from "../../components/DefaultTemplate"
import { SaleListComp } from "../../components/SaleList"

export const ControleVendas = () => {
    return (
        <DefaultTemplate>
            <main>
                <div>
                    <SaleListComp/>
                </div>
            </main>
        </DefaultTemplate>
    )
}