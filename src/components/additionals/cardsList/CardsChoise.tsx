import React from 'react'

interface ICardsChoiseProps {
    children: React.ReactNode,
    panel?: React.ReactNode
}

const CardsChoise = ({ children, panel }: ICardsChoiseProps) => {
    return (
        <div className="cards-choise">
            <div className="cards-choise__list-container">
                <section className="cards-choise__filter-container">
                    {/* <Filter style="cards-choise__filter pd" submit={DoMethod} /> */}
                </section>
                <section className="cards-choise__cards-list">
                    <ul className="cards-choise__list">
                        {children}
                    </ul>
                </section>
            </div>
            {panel}
        </div >
    )
}

export default CardsChoise
