import "./RestaurantBanner.scss"

const RestaurantBanner = ({data}) => {


  return (
    <section className="banner-container">
                <div className="product-banner">
                    <div className="banner-img">
                        <img src={data?.img} alt=""/>
                    </div>
                    <div className="banner-info">
                        <div className="content-wrapper">
                            <div className="res-name">
                                <h2>{data?.name}</h2>
                            </div>
                            <div className="res-extra">
                                <span>{data?.tags}</span>
                                <span>{data?.address?.line} <br /> {data?.address?.city}, {data?.address?.state}. ( {data?.address?.pincode} ) </span>
                                <hr />
                            </div>
                            <div className="actions">
                                <div className="search">
                                    <input type="text" placeholder="Search for dishes..."/>
                                </div>
                                <div className="veg">
                                    <label htmlFor="veg">
                                    <input type="radio" name="n" id="veg" />
                                        Veg Only
                                    </label>
                                </div>
                                <div className="nonveg">
                                    <label htmlFor="nonveg">
                                    <input type="radio" name="n" id="nonveg" />
                                        Non-Veg Only
                                    </label>
                                </div>
                            </div>
                        </div>

                    </div>
                    <div className="offers">
                        <div className="offers-content">
                            <div>
                                <i className="fa-solid fa-tags"></i>
                                <strong>25% off up to ₹100 | Use AUDC100 Above ₹299</strong>
                            </div>
                            <div>
                                <i className="fa-solid fa-tags"></i>
                                <strong>FREE DELIVERY</strong>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
  )
}

export default RestaurantBanner