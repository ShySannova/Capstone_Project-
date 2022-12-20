import "./Footer.scss"

export default function Footer(){
    return(
        <footer className="footer">
            <div className="top">
                <div className="item">
                    <h1>Categories</h1>
                    <span>Veg</span>
                    <span>Non-Veg</span>
                    <span>Dessert</span>
                    <span>Fast-Food</span>
                </div>
                <div className="item">
                    <h1>Links</h1>
                    <span>FAQ</span>
                    <span>MENU</span>
                    <span>VENDOR</span>
                    <span>HOME</span>
                    <span>LOGIN</span>
                </div>
                <div className="item">
                    <h1>About</h1>
                    <span>
                    Lorem ipsum dolor sit amet conse ctetur adipisicing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore. Lorem ipsum dolor sit
                    amet conse ctetur adipisicing elit, seddo eiusmod tempor incididunt
                    ut labore etdolore.
                    </span>
                </div>
                <div className="item">
                    <h1>Contact</h1>
                    <span>Lorem ipsum dolor sit,
                        <br />Lorem ipsum dolor,
                        <br />adafssfa.
                    </span>
                    <span>+91 01023 24224</span>
                </div>
            </div>
            <div className="bottom">
                <div className="left">
                    <span className="logo">Shokutsu</span>
                    <span className="copyright">
                    © Copyright 2023. All Rights Reserved
                    </span>
                </div>
                <div className="right">
                    <img src="/img/payment.png" alt="" />
                </div>
            </div>
        </footer>
    )
}