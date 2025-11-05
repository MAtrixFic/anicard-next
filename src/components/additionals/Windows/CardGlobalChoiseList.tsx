import { useEffect, useRef, useState, type RefObject } from 'react'
import PreviewCard from '../cards/PreviewCard'
import PreviewSelectionCard from '../cards/PreviewSelectionCard'
import PurpleButton from '../buttons/PurpleButton'
import { Arrow } from '../../icons/Cards'
import Input from '../Input'
import SearchFilter from '../../routes/profile/SearchFilter'
import { useCardsStore, type ICardStore } from '../../../devs/store/CardsStore'
import useSelectionCard from '@/devs/hooks/useSelectionCard'
import { createPortal } from 'react-dom'

export interface ICard extends IShortCardInfo { src: string, id: number }
export interface IShortCardInfo {
    desc?: string,
    name: string,
    rang: 'A' | 'S' | 'C' | 'B' | 'D'
}

interface ICardGlobalChoiseList {
    choisenCardsNumber: number,
    cardsRef: RefObject<ICard[]>,
    cardsType: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>
}

const CardGlobalChoiseList = ({ choisenCardsNumber, cardsRef, cardsType }: ICardGlobalChoiseList) => {
    const cards = useCardsStore(state => state.allCards)
    const GetCards = useCardsStore(state => state.GetCards)
    const favoridsPreview = useRef<ICard[]>(GetCards(cardsType))

    const [favoriteCards, setFavoriteCards] = useState<(ICard | null)[]>(favoridsPreview.current.length > 0 ? favoridsPreview.current : new Array(choisenCardsNumber).fill(null))
    const [selectedCard, setSelectedCard] = useSelectionCard()

    function SetFavoriteCard(index: number) {
        if (selectedCard) {
            const previewFavoriteCards = Object.create(favoriteCards)
            previewFavoriteCards[index] = selectedCard
            setFavoriteCards(previewFavoriteCards);
            cardsRef.current = previewFavoriteCards
            setSelectedCard(null);
        }
    }

    function DeleteFavoriteCard(index: number) {
        const previewFavoriteCards = Object.create(favoriteCards)
        previewFavoriteCards[index] = null
        setFavoriteCards(previewFavoriteCards);
        cardsRef.current = previewFavoriteCards
    }

    return (
        <div className="cards-choise">
            {selectedCard && createPortal(<CardDesctiption
                opts={selectedCard ? [{ key: 'Ранг', value: selectedCard.rang }] : []}
                name={selectedCard?.name}
            />, document.querySelector('.desc-panel')!)}
            <div className="cards-choise__favorite-cards-list-container">
                <ul className="cards-choise__favorite-list">
                    {new Array(choisenCardsNumber).fill(0).map((_, i) =>
                        <PreviewCard key={i}
                            thisCard={favoriteCards[i]!}
                            func={() => SetFavoriteCard(i)}
                            deleteFunc={() => DeleteFavoriteCard(i)}
                            // setSelection={() => setSelectedCard()}
                        />

                    )}
                </ul>
            </div>
            <div className="cards-choise__list-container">
                <section className="cards-choise__filter">
                    <Input />
                    <SearchFilter />
                </section>
                <section className="cards-choise__cards-list">
                    <ul className="cards-choise__list">
                        {cards.filter((v) => !favoriteCards.includes(v))
                            .map((v, i) =>
                                <PreviewSelectionCard
                                    key={v?.id + i}
                                    setSelection={setSelectedCard}
                                    selectedCard={selectedCard}
                                    thisCard={v}
                                />
                            )}
                    </ul>
                </section>
            </div>
        </div>
    )
}

export const CardDesctiption = ({ name, opts }: { name?: string, opts?: { key: string, value: string }[] }) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, isSelected] = useState(false);

    useEffect(() => {
        if (name) {
            isSelected(true)
        }
        else isSelected(false);
    }, [name])

    return (
        <section className="card-desc__description">
            <div className="card-desc__top-block">
                {selected &&
                    <>
                        <div className="card-desc__top-container">
                            <h4 className='card-desc__name'>
                                {name}
                            </h4>
                        </div>
                        <div className="card-desc__top-container">
                            <PurpleButton
                                active={selected}
                                title={<Arrow />}
                                func={() => setIsOpen(prev => !prev)}
                                additionStyle={`tiny arrow arrow-${isOpen ? 'opened' : 'hidden'}`}
                            />
                        </div>
                    </>
                }
            </div>
            {isOpen && <div className="card-desc__desc-container">
                <ul className="card-desc__desc-list">
                    {opts && opts?.map((v, i) =>
                        <li className="card-desc__desc-element" key={i + v.key}>
                            <span className='card-desc__desc-key'>
                                {`${v.key}:`}
                            </span>
                            <span className='card-desc__desc-value'>
                                {v.value}
                            </span>
                        </li>
                    )}
                </ul>
            </div>
            }
        </section>
    )
}

export default CardGlobalChoiseList
