import { useEffect, useState, type RefObject } from 'react'
import PreviewCard from '../cards/PreviewCard'
import PreviewSelectionCard from '../cards/PreviewSelectionCard'
import PurpleButton from '../buttons/PurpleButton'
import { Arrow } from '../../icons/Cards'
import { type ICardStore } from '../../../devs/store/CardsStore'
import useSelection from '@/devs/hooks/useSelection'
import { createPortal } from 'react-dom'
import Filter from '../form/Filter'
import { useCards } from '@/devs/hooks/server/useCards'
import { useQuery } from '@tanstack/react-query'

export interface ICard extends IShortCardInfo { photo: string, id: number }
export type TCardRarity = 'A' | 'S' | 'C' | 'B'
export interface IShortCardInfo {
    universe: string,
    rating: number,
    character?: string,
    rarity: TCardRarity,
    attribute: string,
    category: string,
    price?: string
}

interface ICardGlobalChoiseList {
    choisenCardsNumber: number,
    cardsRef: RefObject<(ICard | null)[]>,
    cardsType: keyof Omit<ICardStore, 'SetCards' | 'GetCards'>
}

const CardGlobalChoiseList = ({ choisenCardsNumber, cardsRef, cardsType }: ICardGlobalChoiseList) => {
    const { getCards, setCards } = useCards()
    const [selectedCard, setSelectedCard] = useSelection<ICard>()
    const [updated, setUpdated] = useState<boolean>(false)

    const [activeCards, setActiveCards] = useState<(ICard | null)[]>(new Array(choisenCardsNumber).fill(null))
    const [previewCards, setPreviewCards] = useState<ICard[]>([])

    const query = useQuery({
        queryKey: ['all-cards', cardsType],
        queryFn: async () => getCards('allCards').then(data => {
            const cards = data.length > 0 ? data.filter(v => cardsType !== 'favorite' ? v.category === cardsType : true) : []
            setPreviewCards(cards);
            return cards
        }),
    })

    useEffect(() => {
        getCards(cardsType).then(data => {
            let activeCells = activeCards
            if (data.length > 0) {
                activeCells = activeCells.map((v, i) => data[i] ? data[i] : v)
                setActiveCards(activeCells)
            }
            setUpdated(true)
        })
    }, [])

    async function DoMethod(data: ICard) {
        const filteredResult = Object.fromEntries(
            Object.entries(data).filter(([_, value]) =>
                value ? value.toString().length > 0 && value.toString() !== '0' : false
            )
        );
        if (query.data)
            setPreviewCards(query.data?.filter(v => Object.keys(filteredResult).every(vk => v[vk as keyof ICard] == filteredResult[vk])
            ))
    }

    function SetFavoriteCard(index: number) {
        if (selectedCard) {
            const previewFavoriteCards = new Array(...activeCards)
            previewFavoriteCards[index] = selectedCard
            setActiveCards(previewFavoriteCards);
            cardsRef.current = previewFavoriteCards
            console.log(previewFavoriteCards)
            setCards(cardsType, previewFavoriteCards.filter(v => v !== null));
            setSelectedCard(null);
        }
    }

    function DeleteFavoriteCard(index: number) {
        const previewFavoriteCards = new Array(...activeCards)
        previewFavoriteCards[index] = null
        setActiveCards(previewFavoriteCards);
        console.log(previewFavoriteCards)
        console.log(activeCards.filter(v => v !== null))
        setCards(cardsType, previewFavoriteCards.filter(v => v !== null));
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
                <Filter style='cards-choise__filter' submit={DoMethod} />
                <section className="cards-choise__cards-list">
                    <ul className="cards-choise__list">
                        {previewCards && updated && previewCards.filter((v) => !activeCards.map(v => v ? v.id : null).includes(v.id))
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
                    {Object.keys(card).filter(v => !['created', 'updated', 'photo', 'id'].includes(v))
                        .filter(v => card[v as keyof ICard] ? card[v as keyof ICard]!.toString().length > 0 : false)
                        .map((v, i) =>
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
