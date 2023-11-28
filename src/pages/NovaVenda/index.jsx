import { DefaultTemplate } from "../../components/DefaultTemplate"
import { RegisterSaleForm } from "../../components/forms/RegisterSaleForm"

export const NovaVenda = () => {
    return (
        <main className="background">
            <DefaultTemplate>
                <div className="content">
                    <h1 className="title grey1">Nova Venda</h1>
                    <RegisterSaleForm />
                </div>
            </DefaultTemplate>
        </main>
    )
}