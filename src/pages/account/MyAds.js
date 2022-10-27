import React from 'react'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Table from 'react-bootstrap/Table'
import AdsTr from '../../components/AdsTr'
import { Link } from 'react-router-dom'

const MyAds = () => {
    return (
        <div className='main'>
            <h4 className='color-1'>Мои объявления</h4>
            <Link to='new' className='btn-5'>+ Разместить новое объявление</Link>
            <Row md={3} className='mt-4'>
                <Col className='d-flex align-items-center'>
                    <span className='me-3'>Игра:</span>
                    <select defaultValue={3}>
                        <option disabled>Игра</option>
                        <option value={1}>Игра 1</option>
                        <option value={2}>Игра 2</option>
                        <option value={3}>Игра 3</option>
                        <option value={4}>Игра 4</option>
                        <option value={5}>Игра 5</option>
                    </select>
                </Col>
                <Col className='d-flex align-items-center'>
                    <span className='me-3'>Сервер:</span>
                    <select defaultValue={3}>
                        <option disabled>Сервер</option>
                        <option value={1}>Сервер 1</option>
                        <option value={2}>Сервер 2</option>
                        <option value={3}>Сервер 3</option>
                        <option value={4}>Сервер 4</option>
                        <option value={5}>Сервер 5</option>
                    </select>
                </Col>
                <Col className='d-flex align-items-center'>
                    <span className='me-3'>Платформа:</span>
                    <select defaultValue={3}>
                        <option disabled>Платформа</option>
                        <option value={1}>Платформа 1</option>
                        <option value={2}>Платформа 2</option>
                        <option value={3}>Платформа 3</option>
                        <option value={4}>Платформа 4</option>
                        <option value={5}>Платформа 5</option>
                    </select>
                </Col>
            </Row>

            <Table borderless className='my-4'>
                <thead>
                    <tr>
                        <th>Дата</th>
                        <th>Заказ</th>
                        <th>Уровень</th>
                        <th>Описание</th>
                        <th>Цена</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <AdsTr date={'24.08.2022'} order={'#CTWVZGG6'} level={'4738'} description={'ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar'} price={3000}/>
                    <AdsTr date={'24.08.2022'} order={'#CTWVZGG6'} level={'4738'} description={'ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar'} price={3000}/>
                    <AdsTr date={'24.08.2022'} order={'#CTWVZGG6'} level={'4738'} description={'ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar'} price={3000}/>
                    <AdsTr date={'24.08.2022'} order={'#CTWVZGG6'} level={'4738'} description={'ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar'} price={3000}/>
                    <AdsTr date={'24.08.2022'} order={'#CTWVZGG6'} level={'4738'} description={'ProjectSuperEssence.net Top Rang Step - Season 3, l8k-2568, Прочее, Без ранга, 150 шт., Avatar'} price={3000}/>
                </tbody>
            </Table>
            <nav className='pagination'>
                <ul>
                    <li><a href='/' className='active'>1</a></li>
                    <li><button>2</button></li>
                </ul>
            </nav>
        </div>
    );
};

export default MyAds;