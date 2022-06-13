import {useEffect, useRef, useState} from "react";
import ShoesService from "../../services/shoes.service";
import {ShoesSave} from "../../components/shoes-save";
// import shoesService from "../../services/shoes.service";
import {ShoesDelete} from "../../components/shoes-delete";
import Shoes from "../../models/shoes";

const AdminPage = () =>{

    const [shoesList, setShoesList] = useState([]);

    const [selectedShoes, setSelectedShoes] =
        useState(new Shoes('','','', '', '',0));

    const [errorMessage, setErrorMessage] = useState('');

    const saveComponent = useRef();
    const deleteComponent = useRef();

    useEffect(() =>{
        ShoesService.getAllShoes().then((response) =>{
            setShoesList(response.data);
        });
    }, []);

    const createShoesRequest = () => {
        setSelectedShoes(
            new Shoes('','', '','', '',0));

        saveComponent.current?.showShoesModal();


    };

    const editShoesRequest = (item) =>{
        setSelectedShoes(Object.assign({}, item));
        saveComponent.current?.showShoesModal();
    };

    const deleteShoesRequest = (shoes) => {
        setSelectedShoes(shoes);
        console.log("Calling deleteShoesRequest///");
        deleteComponent.current?.showDeleteModal();
    }

    const saveShoesWatcher = (shoes) =>{
        let itemIndex = shoesList.findIndex(item => item.id === shoes.id);

        if (itemIndex !== -1){
            const newList = shoesList.map((item) => {
                if (item.id === shoes.id){
                    return shoes;
                }
                return item;
            });
            setShoesList(newList);
        } else {
            const newList = shoesList.concat(shoes);
            setShoesList(newList);
        }

    };

    const deleteShoes = () => {
        // console.log("Calling deleteShoes() without the button press");
        ShoesService.deleteShoes(selectedShoes).then(_ => {
            setShoesList(shoesList.filter(x => x.id !== selectedShoes.id));
        }).catch(err => {
            setErrorMessage('Unexpected error occurred.');
            console.log(err);
        })
    };

    return (
        <div className="container">
            <div className="pt-5">


                {errorMessage &&
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                }

                <div className="card">
                    <div className="card-header">

                        <div className="row">
                            <div className="col-6">
                                <h3>All shoes</h3>
                            </div>

                            <div className="col-6 text-end">
                                <button className="btn btn-primary" onClick={() => createShoesRequest()}>
                                    Create Shoes
                                </button>
                            </div>

                        </div>

                    </div>
                    <div className="card-body">
                        <table className="table table-striped">
                            <thead>
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Shoes name</th>
                                <th scope="col">Brand</th>
                                {/*<th scope="col">Image Src</th>*/}
                                <th scope="col">description</th>
                                <th scope="col">Size</th>
                                <th scope="col">Price</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>
                            {shoesList.map((item, ind) =>
                                <tr key={item.id}>
                                    <th scope="row">{ind +1}</th>
                                    <td>{item.shoesName}</td>
                                    <td>{item.brand}</td>
                                    {/*<td>{item.imageSrc}</td>*/}
                                    <td>{item.description}</td>
                                    <td>{item.size}</td>
                                    <td>{`$ ${item.price}`}</td>
                                    <td>
                                        <button className="btn btn-success me-1" onClick={() => editShoesRequest(item)}>
                                            Edit
                                        </button>
                                        <button className="btn btn-danger me-1" onClick={() => deleteShoesRequest(item)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>

                            )}

                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <ShoesSave ref={saveComponent} shoes={selectedShoes} onSaved={(p) => saveShoesWatcher(p)}/>
            <ShoesDelete ref={deleteComponent} onConfirmed={()=>deleteShoes()}/>

        </div>
    );
}

export {AdminPage};