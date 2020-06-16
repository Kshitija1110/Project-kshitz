import React from 'react';
import { Slide } from 'react-slideshow-image';
import image1 from '../../assets/Images/image1.jpg';
import image2 from '../../assets/Images/image2.jpg';
import image3 from '../../assets/Images/image3.jpg';
import image4 from '../../assets/Images/image4.jpg';
import image5 from '../../assets/Images/image5.jpg';
import classes from './CoverPage.module.css';


const proprietes = {
duration: 5000,
transitionDuration: 500,
infinite: true,
indicators: true,
arrows: true
}

const CoverPage = () => {
return (
<div className={classes.containerSlide}>
<Slide {...proprietes}>
<div className="each-slide">
<div>
<img src={image1} alt="img1" />
</div>
</div>
<div className="each-slide">
<div>
<img src={image2} alt="img2" />
</div>
</div>
<div className="each-slide">
<div>
<img src={image3} alt="img3" />
</div>
</div>
<div className="each-slide">
<div>
<img src={image4} alt="img2" />
</div>
</div>
<div className="each-slide">
<div>
<img src={image5} alt="img2" />
</div>
</div>
</Slide>
</div>
)
}

export default CoverPage;