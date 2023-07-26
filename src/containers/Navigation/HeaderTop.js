import {Container, Row, Col } from 'reactstrap';

export default function HeaderTop() {
    return(
        <div className='header-info'>
            <Container>
            <Row>
                <Col md='4' className='text-center d-none d-md-block'>
                <i className='fa fa-truck' />
                <span>Author: <a  className='text-white' href="http://github.com/Diyor11">Diyor11</a></span>
                </Col>
                <Col md='4' className='text-center d-none d-md-block'>
                <i className='fa fa-credit-card' />
                <span>Payment Methods</span>
                </Col>
                <Col md='4' className='text-center d-none d-md-block'>
                <i className='fa fa-phone' />
                <span>Call us <a className='text-white' href="tel:977382310">(97) 738 23 10</a></span>
                </Col>
                <Col xs='12' className='text-center d-block d-md-none'>
                <i className='fa fa-phone' />
                <span> Need advice? Call us <a className='text-white' href="tel:977382310">(97) 738 23 10</a></span>
                </Col>
            </Row>
            </Container>
        </div>
    )
}