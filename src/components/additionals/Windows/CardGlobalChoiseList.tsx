import { useEffect, useRef, useState, type RefObject } from 'react'
import PreviewCard from '../cards/PreviewCard'
import PreviewSelectionCard from '../cards/PreviewSelectionCard'
import PurpleButton from '../buttons/PurpleButton'
import { Arrow } from '../../icons/Cards'
import { type ICardStore } from '../../../devs/store/CardsStore'
import useSelection from '@/devs/hooks/useSelection'
import { createPortal } from 'react-dom'
import Filter from '../form/Filter'
import { useCards } from '@/devs/hooks/server/useCards'
import { useUser } from '@/devs/hooks/server/useUser'

export interface ICard extends IShortCardInfo { photo: string, id: number }
export interface IShortCardInfo {
    universe: string,
    rating: number,
    character: string,
    rarity: 'A' | 'S' | 'C' | 'B' | 'D',
    attribute: string,
    category: string
}

interface ICardGlobalChoiseList {
    choisenCardsNumber: number,
    cardsRef: RefObject<(ICard | null)[]>,
    cardsType: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>
}

const CardGlobalChoiseList = ({ choisenCardsNumber, cardsRef, cardsType }: ICardGlobalChoiseList) => {
    const { user } = useUser();
    const { getCards } = useCards()
    const [selectedCard, setSelectedCard] = useSelection<ICard>()

    const [activeCards, setActiveCards] = useState<(ICard | null)[]>(new Array(choisenCardsNumber).fill(null))
    const [inventoryCards, setInventoryCards] = useState<ICard[]>([]);
    const [previewCards, setPreviewCards] = useState<ICard[]>([])

    useEffect(() => {
        if (user) {
            getCards('allCards').then(data => {
                const cards = data.length > 0 ? data.filter(v => cardsType !== 'favorite' ? v.category === cardsType : true) : []
                setInventoryCards(cards);
                setPreviewCards(cards);
            })
        }
    }, [user?.id || 0])

    useEffect(() => {
        getCards(cardsType).then(data => {
            let activeCells = activeCards
            if (data.length > 0) {
                activeCells = activeCells.map((v, i) => data[i] ? data[i] : v)
                setActiveCards(activeCells)
            }
        })
    }, [])

    function SetFavoriteCard(index: number) {
        if (selectedCard) {
            const previewFavoriteCards = new Array(...activeCards)
            previewFavoriteCards[index] = selectedCard
            setActiveCards(previewFavoriteCards);
            cardsRef.current = previewFavoriteCards
            console.log(previewFavoriteCards)
            setSelectedCard(null);
        }
    }

    function DeleteFavoriteCard(index: number) {
        const previewFavoriteCards = new Array(...activeCards)
        previewFavoriteCards[index] = null
        setActiveCards(previewFavoriteCards);
        console.log(previewFavoriteCards)
        cardsRef.current = previewFavoriteCards
    }

    return (
        <div className="cards-choise">
            {selectedCard && createPortal(<CardDesctiption
                {...selectedCard}
            />, document.querySelector('.desc-panel')!)}
            <div className="cards-choise__favorite-cards-list-container">
                <ul className="cards-choise__favorite-list">
                    {new Array(choisenCardsNumber).fill(0).map((_, i) =>
                        <PreviewCard key={i}
                            thisCard={activeCards[i]!}
                            func={() => SetFavoriteCard(i)}
                            deleteFunc={() => DeleteFavoriteCard(i)}
                        />
                    )}
                </ul>
            </div>
            <div className="cards-choise__list-container">
                <Filter style='cards-choise__filter' submit={() => console.log('filter')} />
                <section className="cards-choise__cards-list">
                    <ul className="cards-choise__list">
                        {inventoryCards.filter((v) => !activeCards.map(v => v ? v.id : null).includes(v.id))
                            .map((v) =>
                                <PreviewSelectionCard
                                    key={v?.id}
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

export const CardDesctiption = (card: ICard) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, isSelected] = useState(false);

    useEffect(() => {
        if (card) {
            isSelected(true)
        }
        else isSelected(false);
    }, [card.id])

    return (
        <section className="card-desc__description">
            <div className="card-desc__top-block">
                {selected &&
                    <>
                        <div className="card-desc__top-container">
                            <h4 className='card-desc__name'>
                                {card.character ? card.character : 'Карта'}
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
                    {Object.keys(card).filter(v => !['created', 'updated', 'photo', 'id'].includes(v)).map((v, i) =>
                        <li className="card-desc__desc-element" key={i}>
                            <span className='card-desc__desc-key'>
                                {`${v}:`}
                            </span>
                            <span className='card-desc__desc-value'>
                                {card[v as keyof ICard]}
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
