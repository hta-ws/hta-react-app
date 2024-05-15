import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

const Main = () => {
  return (
    <React.Fragment>
      <section className='section nft-hero' id='hero'>
        <div className='bg-overlay'></div>
        <Container>
          <Row className='justify-content-center'>
            <Col lg={8} sm={10}>
              <div className='text-center'>
                <h1 className='display-4 fw-medium mb-4 lh-base text-white'>
                  Bir Tıkla Derinlemesine
                  <br />
                  <span className='text-success'>Hisse Analizi!</span>
                </h1>
                <p className='lead text-white-50 lh-base mb-4 pb-2'>
                  Piyasada yüzlerce hisse senedi varken, hangilerinin gerçek
                  potansiyele sahip olduğunu bilmek zor olabilir.
                  HisseTemelAnaliz ile finansal tabloların ötesine geçin,
                  şirketlerin temel verilerini derinlemesine analiz edin.
                </p>

                <div className='hstack gap-2 justify-content-center'>
                  <Link to='/nft-create' className='btn btn-primary'>
                    Create Own{' '}
                    <i className='ri-arrow-right-line align-middle ms-1'></i>
                  </Link>
                  <Link to='/nft-explore' className='btn btn-danger'>
                    Explore Now{' '}
                    <i className='ri-arrow-right-line align-middle ms-1'></i>
                  </Link>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </React.Fragment>
  );
};

export default Main;
