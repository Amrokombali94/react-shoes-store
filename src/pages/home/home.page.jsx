import {useEffect, useState} from "react";
import shoesService from "../../services/shoes.service";
import {useSelector} from "react-redux";
import Purchase from "../../models/purchase";
import PurchaseService from "../../services/purchase.service";
import './home.page.css';

const HomePage = () =>{



    const [shoesList, setShoesList] = useState([]);
    const [errorMessage, setErrorMessage] = useState('');
    const [infoMessage, setInfoMessage] = useState('');

    const currentUser = useSelector(state => state.user);

    useEffect(() => {
        shoesService.getAllShoes().then((response) => {
            setShoesList(response.data);
        });
    },[]);

    const purchase = (shoes) => {

        if (!currentUser?.id){
            setErrorMessage('You should login to buy a shoes');
            return;
        }

        const purchase = new Purchase(currentUser.id, shoes.id, shoes.price);

        PurchaseService.savePurchase(purchase).then(() => {
            setInfoMessage('Mission completed');
        }).catch((err) => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        });

    };


    return (
        <div className="container p-3">

            {errorMessage &&
                <div className="alert alert-danger">
                    {errorMessage}
                </div>
            }

            {infoMessage &&
                <div className="alert alert-success">
                    {infoMessage}
                </div>
            }

            <div className="d-flex flex-wrap">
                {shoesList.map((item, ind) =>
                    <div key={item.id} className="card m-3 home-card">

                        <div className="card-body">
                            <div className="card-title text-uppercase">{item.shoesName}</div>
                            <img className="card-img-top" src={item.imageSrc} alt="Card image cap"/>
                            <div className="card-subtitle text-muted">{item.description}</div>

                        </div>

                        <div className="row mt-2 p-3">
                            <div className="col-6 mt-2 ps-4">
                                {`$ ${item.price}`}
                            </div>
                            <div className="col-6">
                                <button className="btn btn-outline-success w-100" onClick={() => purchase(item)}>
                                    Buy
                                </button>
                            </div>
                        </div>

                    </div>
                )}
            </div>



        </div>
    );
}

export {HomePage};