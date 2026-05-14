import { useEffect, useMemo, useState, type RefObject } from 'react'
import PreviewCard from '../cards/PreviewCard'
import PreviewSelectionCard, { BaseFrame } from '../cards/PreviewSelectionCard'
import PurpleButton from '../buttons/PurpleButton'
import { Arrow } from '../../icons/Cards'
import useSelection from '@/devs/hooks/useSelection'
import { createPortal } from 'react-dom'
import Filter from '../form/Filter'
import { useCards } from '@/devs/hooks/server/useCards'
import { useQuery } from '@tanstack/react-query'
import LightButton from '../buttons/LightButton'
import { IElement, IPet } from '@/devs/store/PetsStore'
import CardsChoise from '../cardsList/CardsChoise'
import PreviewSelectionPets, { PetFrame } from '../pets/PreviewSelectionPets'

export interface ICard extends IShortCardInfo, IElement { }

export type TCardRarity = 'A' | 'S' | 'C' | 'B'
export interface IShortCardInfo {
    universe: string,
    rating: number,
    character?: string,
    rarity: TCardRarity,
    attribute: string,
    category: string,
    price?: string,
    current_rating?: number,
    copies?: number,
}

interface ICardGlobalChoiseList<T extends { id: number, photo: string }> {
    choisenMaterialNumber: number,
    materialRef: RefObject<(T | null)[]>,
    materialType: 'battle-cards' | 'favorite-cards' | 'battle-pet',
    loadAllMaterials: (args?: any) => Promise<T[]>,
    loadSelectedMaterials: (args?: any) => Promise<T[]>,
}

const CardGlobalChoiseList = ({ choisenMaterialNumber, materialRef, materialType, loadAllMaterials, loadSelectedMaterials }: ICardGlobalChoiseList<ICard | IPet>) => {
    const [selectedElement, setSelectedElement] = useSelection<ICard | IPet>()
    const [updated, setUpdated] = useState<boolean>(false)

    const [activeElements, setActiveElements] = useState<typeof materialRef.current>(new Array(choisenMaterialNumber).fill(null))
    const [previewElements, setPreviewElements] = useState<typeof materialRef.current>([])

    const query = useQuery({
        queryKey: ['all-cards', materialType],
        queryFn: async () => loadAllMaterials().then(data => { setPreviewElements([...data]); return data })
    })

    useEffect(() => {
        loadSelectedMaterials().then(data => {
            let activeCells = activeElements
            if (data.length > 0) {
                activeCells = activeCells.map((v, i) => data[i] ? data[i] : v)
                setActiveElements(activeCells)
            }
            setUpdated(true)
        })
    }, [])

    useEffect(() => {
        console.log('preview', previewElements)
        console.log('active', activeElements)
    }, [previewElements, activeElements])

    // async function DoMethod(data: ICard) {
    //     const filteredResult = Object.fromEntries(
    //         Object.entries(data).filter(([_, value]) =>
    //             value ? value.toString().length > 0 && value.toString() !== '0' : false
    //         )
    //     );
    //     if (query.data)
    //         setPreviewElements(query.data?.filter(v => Object.keys(filteredResult).every(vk => v[vk as keyof ICard] == filteredResult[vk])
    //         ))
    // }

    function SetFavoriteElements(index: number) {
        if (selectedElement) {
            const previewFavoriteCards = new Array(...activeElements)
            previewFavoriteCards[index] = selectedElement
            setActiveElements(previewFavoriteCards);
            materialRef.current = previewFavoriteCards
            setSelectedElement(null);
        }
    }

    function DeleteFavoriteElement(index: number) {
        const previewFavoriteCards = new Array(...activeElements)
        previewFavoriteCards[index] = null
        setActiveElements(previewFavoriteCards);
        materialRef.current = previewFavoriteCards
    }

    return (
        <div className="cards-choise">
            {selectedElement && createPortal(<CardDesctiption
                {...selectedElement}
            />, document.querySelector('.desc-panel')!)}
            <div className="cards-choise__favorite-cards-list-container">
                <ul className="cards-choise__favorite-list">
                    {new Array(choisenMaterialNumber).fill(0).map((_, i) => {
                        const ae = activeElements[i] as ICard
                        return (
                            <PreviewCard key={i}
                                thisCard={ae!}
                                func={() => SetFavoriteElements(i)}
                                deleteFunc={() => DeleteFavoriteElement(i)}
                            />
                        )
                    }
                    )}
                </ul>
            </div>
            <CardsChoise>
                {previewElements && updated && previewElements.filter((pe) => !activeElements.map(ae => ae ? ae.id : null).includes(pe ? pe.id : null))
                    .map((v) => {
                        const cardEl = selectedElement as ICard
                        const currentCard = v as ICard

                        const petEl = selectedElement as IPet
                        const currentPet = v as IPet
                        return (
                            materialType.includes('card') ?
                                <PreviewSelectionCard
                                    key={v?.id}
                                    setSelection={setSelectedElement}
                                    selectedCard={cardEl}
                                    thisCard={currentCard}
                                >
                                    <BaseFrame
                                        university={currentCard.universe}
                                        rarity={currentCard.rarity}
                                        rating={currentCard.current_rating?.toString() || '0'}
                                        name={currentCard.character || ''}
                                        attribute={currentCard.attribute} />
                                </PreviewSelectionCard>
                                :
                                <PreviewSelectionPets
                                    key={v?.id}
                                    setSelection={setSelectedElement}
                                    selectedPet={petEl}
                                    thisPet={currentPet}
                                >
                                    <PetFrame attribute={currentPet.attribute} rarity={currentPet.rarity} rating={currentPet.current_rating?.toString() || '0'} name={currentPet.character} />
                                </PreviewSelectionPets>
                        )
                    }
                    )}
            </CardsChoise>
        </div>
    )
}

export const CardDesctiption = (element: IElement) => {
    const [isOpen, setIsOpen] = useState(false);
    const [selected, isSelected] = useState(false);

    useEffect(() => {
        if (element) {
            isSelected(true)
        }
        else isSelected(false);
    }, [element.id])

    return (
        <section className="card-desc__description">
            <div className="card-desc__top-block">
                {selected &&
                    <>
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
                    {Object.keys(element).filter(v => !['created', 'updated', 'photo', 'id', 'isBattle', 'isFavorite', 'rating', 'user_id', 'copies'].includes(v))
                        .filter(v => element[v as keyof IElement] ? element[v as keyof IElement]!.toString().length > 0 : false)
                        .map((v, i) =>
                            <li className="card-desc__desc-element" key={i}>
                                <span className='card-desc__desc-key'>
                                    {`${v}:`}
                                </span>
                                <span className='card-desc__desc-value'>
                                    {element[v as keyof IElement]}
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
