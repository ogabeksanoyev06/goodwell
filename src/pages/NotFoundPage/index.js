import React from 'react';
import { NoData } from "../../components";

const Index = () => {
    return (
        <div className='container'>
            <NoData
                className={'--big-image'}
                bigImage={true}
                title={'Странница не найдена'}
                description={'Просим прощения! Странница по вашему по запросу не может быть найдена'}
                link={'/'}
                linkText={'Перейти на Главную '}
            />
        </div>
    );
};

export default Index;
