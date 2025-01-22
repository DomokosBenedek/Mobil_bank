export default function Footer() {
    return (
        <section className='footer'>
            <div className="footer-content">
                {/* Hírlevél regisztráció */}
                <div className="newsletter">
                <h4 className="alter">Iratkozz fel hírlevelünkre!</h4>
                <form>
                    <input type="email" placeholder="Add meg az email címedet" required />
                    <button className="primary_v1">Feliratkozás</button>
                </form>
                </div>

                {/*Linkek */}
                <div className="footer-links">
                <div className="links-column alter">
                    <a href="#">Link1</a>
                    <a href="#">Link2</a>
                    <a href="#">Link3</a>
                    <a href="#">Link4</a>
                </div>
                <div className="links-column">
                    <a href="#">Link5</a>
                    <a href="#">Link6</a>
                    <a href="#">Link7</a>
                    <a href="#">Link8</a>
                </div>
                </div>
            </div>
        </section>
    );
}