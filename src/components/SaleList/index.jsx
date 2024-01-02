import { useContext } from "react"
import { ControlSaleContext } from "../../providers/ControlSaleContext"
import { SaleCard } from "./SaleCard"
import styles from "./style.module.scss"
import { Input } from "../forms/Input"
import { Select } from "../forms/Select"

export const SaleListComp = () => {
    const {
        selectEtapas, selectedEtapasFilter, setSelectedEtapasFilter, selectChange,
        errorVerify, setErrorVerify,

        nome, setNome,
        cpf_cnpj, setCpf_cpnj,
        dataInicial, setDataInicial,
        dataFinal, setDataFinal,

        handleFilterClick,
        saleListFilter,
        handleUpdateList,

    } = useContext(ControlSaleContext)

    return (
        <div className={styles.saleListDiv}>
            <div >
                <h1 className="title grey0">Controle de Vendas</h1>
                <button onClick={handleUpdateList} className="btn solid primary small">Atualizar Lista</button>
            </div>
            <div className={styles.filterDivAll}>
                <div className={styles.filterDivItens}>
                    <div>
                        <Input
                            type="text"
                            label="Nome:"
                            placeholder="Consulte por nome"
                            value={nome}
                            onChange={(e) => setNome(e.target.value)}
                        />
                        <Input
                            type="number"
                            label="CPF/CNPJ:"
                            placeholder="CPF/CNPJ Apenas números"
                            value={cpf_cnpj}
                            onChange={(e) => setCpf_cpnj(e.target.value)}
                        />
                        <Select
                            name="etapa"
                            selectChange={selectChange}
                            options={selectEtapas}
                            id={selectedEtapasFilter}
                            onChange={setSelectedEtapasFilter}
                            placeholder="Todos"
                            label="Etapa"
                            errorVerify={errorVerify}
                            setErrorVerify={setErrorVerify}
                        />
                    </div>
                    <div>
                        <span className="title grey2 small">Data Geração:</span>
                        <Input
                            type="date"
                            label="Data inicial"
                            value={dataInicial}
                            onChange={(e) => setDataInicial(e.target.value)}
                        />
                        <Input
                            type="date"
                            label="Data final"
                            value={dataFinal}
                            onChange={(e) => setDataFinal(e.target.value)}
                        />
                    </div>
                </div>
                <div>
                    <button className="btn solid primary" onClick={handleFilterClick}>
                        Filtrar
                    </button>
                </div>
            </div>
            <ul>
                <section className={styles.sectionAllTabel}>
                    <div className={styles.saleTitles}>
                        <span className="paragraph grey1">CPF/CNPJ:</span>
                        <span className="paragraph grey1">Cliente:</span>
                        <span className="paragraph grey1">Nome Consultor:</span>
                        <span className="paragraph grey1">Plano: </span>
                        <span className="paragraph grey1">Etapa: </span>
                        <span className="paragraph grey1">Data Geração:</span>
                    </div>
                    <div className={styles.divSaleCard}>
                        {saleListFilter && saleListFilter.length > 0 ? (
                            saleListFilter.map(sale => (
                                <SaleCard key={sale.id_venda} sale={sale} />
                            ))
                        ) : (
                            <h1 className={`paragraph negative ${styles.noRegisterH1}`}>Nenhum registro encontrado!</h1>
                        )}
                    </div>
                </section >
            </ul >
        </div >
    )
}