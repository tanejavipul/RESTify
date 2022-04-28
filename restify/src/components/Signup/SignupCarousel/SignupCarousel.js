import firstIMG from "../../assets/Signup/Oliver-And-Bonacini-Hospitality.jpeg";
import secondIMG from "../../assets/Signup/Ithaa-Undersea-Restaurant.jpeg";
import thirdIMG from "../../assets/Signup/Hell\'s-Kitchen.jpg";

const SignupCarousel = () => {


    return (
        <>
            <div className="col-7">
                <div id="carouselExampleCaptions" className="carousel slide rounding" data-bs-ride="carousel">
                    <div className="carousel-indicators">
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="0" className="active"> </button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="1"> </button>
                        <button type="button" data-bs-target="#carouselExampleCaptions" data-bs-slide-to="2"> </button>
                    </div>
                    <div className="carousel-inner rounding">
                        <div className="carousel-item active rounding">
                            <img
                                src={firstIMG}
                                className="d-block w-100 opacity-50 rounding" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5 className="signin-h5">Oliver & Bonacini Hospitality</h5>
                                    <p className={"signin-h5"}>Like your favourite restaurants</p>
                                </div>
                        </div>
                        <div className="carousel-item rounding">
                            <img src={secondIMG} className="d-block w-100 opacity-50 rounding " alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5 className="signin-h5">Ithaa Undersea Restaurant</h5>
                                    <p className={"signin-h5"}>Post comments about your Experiences.</p>
                                </div>
                        </div>
                        <div className="carousel-item rounding">
                            <img src={thirdIMG} className="d-block w-100 opacity-50 rounding" alt="..."/>
                                <div className="carousel-caption d-none d-md-block">
                                    <h5 className="signin-h5 fw-bold color-main-blue">Hell's Kitchen</h5>
                                    <p className={"signin-h5"}>Read Blogs about Chef Gordon Ramsay's 3-Star Michelin Restaurant</p>
                                </div>
                        </div>
                    </div>
                    <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="prev">
                        <span className="carousel-control-prev-icon"> </span>
                        <span className="visually-hidden">Previous</span>
                    </button>
                    <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleCaptions"
                            data-bs-slide="next">
                        <span className="carousel-control-next-icon"> </span>
                        <span className="visually-hidden">Next</span>
                    </button>
                </div>

            </div>
        </>
    )

}

export default SignupCarousel