'use client'
import '@/styles/farm.scss'
import LightButton from '@/components/additionals/buttons/LightButton'
import Image from 'next/image'
import useOverWindowStatus from '@/devs/hooks/useOverWindowStatus'
import OverBlackSpace from '@/components/additionals/OverBlackSpace'
import { createPortal } from 'react-dom'

const Page = () => {
    const [overWS, setOverWS, setWMode] = useOverWindowStatus(300);

    return (
        <div className="farm">
            {['opened', 'to-hide'].includes(overWS) &&
                createPortal(<OverBlackSpace additionStyle={overWS}>
                    <ul className="farm__all-pets-list">

                    </ul>
                    <div className="farm__all-pets-logic">
                        <LightButton title="Отмена" func={setWMode} />
                    </div>
                </OverBlackSpace>, document.body)}
            <div className="farm__place-selector">
                <section className="farm__selector">
                    <ul className="farm__casts-list">
                        <li className='cast'>
                            <div className="cast__number">
                                <span className='cast__text'>1</span>
                            </div>
                            <div className="cast__preview">
                                <Image src="/elements/water.png" alt="Cast" width={24} height={24} quality={60} />
                            </div>
                        </li>
                        <li className='cast'>
                            <div className="cast__number">
                                <span className='cast__text'>4</span>
                            </div>
                            <div className="cast__preview">
                                <Image src="/elements/wind.png" alt="Cast" width={24} height={24} quality={60} />
                            </div>
                        </li>
                        <li className='cast'>
                            <div className="cast__number">
                                <span className='cast__text'>1</span>
                            </div>
                            <div className="cast__preview">
                                <Image src="/elements/fire.png" alt="Cast" width={24} height={24} quality={60} />
                            </div>
                        </li>
                    </ul>
                    <ul className="farm__pets-list">
                        {new Array(6).fill(0).map((v, i) =>
                            <li className="pet-preview" key={i}>
                                <button className='pet-preview__func' onClick={() => setWMode()}>
                                    <span className="pet-preview__null">+</span>
                                </button>
                            </li>
                        )
                        }
                    </ul>
                    <div className="farm__result">
                        <div className="farm__result-title">
                            <h4 className='farm__rt'>
                                Получаемые очки
                            </h4>
                        </div>
                        <div className="farm__result-counter">
                            <span className='farm__result-text'>1200</span>
                        </div>
                    </div>
                </section>
                <section className="farm__logic">
                    <div className="farm__timer">
                        <span className='farm__t-text'>
                            00:00:00
                        </span>
                    </div>
                    <div className="farm__btns">
                        <LightButton title="Начать" />
                    </div>
                </section>
            </div>
        </div>
    )
}

export default Page