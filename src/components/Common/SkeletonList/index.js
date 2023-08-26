import Skeleton from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'

function SkeletonList() {

    return(
        <div className='product-list'>
        {Array(8).fill(null).map((_, index) => (
          <div className='mb-3 mb-md-0' key={index}>
            <div className='product-container'>
              <div className='item-box'>
                <div className='item-link'>
                  <div
                    className='d-flex flex-column h-100'
                  >
                    <div className='item-image-container'>                
                      <Skeleton style={{height: '250px', display: 'block'}} />
                    </div>
                    <div className='item-body'>
                      <div className='item-details p-3'>
                        <h1 className='item-name'><Skeleton /></h1>
                          <p className='by'>
                            <Skeleton />
                          </p>
      
                        <p className='item-desc mb-0'><Skeleton /></p>
                      </div>
                    </div>
                    <div className='d-flex flex-row justify-content-between align-items-center px-4 mb-2 item-footer'>
                      <p className='price mb-0'><Skeleton /></p>
                      <p className='mb-0'>
                        <span className='fs-16 fw-normal mr-1'>
                          <Skeleton />
                        </span>
                        <Skeleton />
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
    </div>
    )
}

  export default SkeletonList;