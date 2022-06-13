import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import ShoesService from "../services/shoes.service";
import Shoes from "../models/shoes";
import {Modal} from "react-bootstrap";

const ShoesSave = forwardRef((props, ref)=> {

    useImperativeHandle(ref, () => ({
        showShoesModal() {
            setTimeout(() =>{
                setShow(true);
            }, 0);
        }
    }));

    useEffect(() => {
        setShoes(props.shoes);
    },[props.shoes]);

    const [shoes, setShoes] = useState(new Shoes('', '','' ,'' ,'', 0));
    const [errorMessage, setErrorMessage] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [show, setShow] = useState(false);

    const saveShoes = (e) => {
        e.preventDefault();



        setSubmitted(true);

        if(!shoes.shoesName || !shoes.brand || !shoes.description || !shoes.size || !shoes.price){
            console.log("inside save shoes function")

            return;
        }
        ShoesService.saveShoes(shoes).then(response => {
            console.log("inside save shoes function")
            props.onSaved(response.data);
            setShow(false);
            setSubmitted(false);

        }).catch(err => {
            setErrorMessage('Unexpected error occurred');
            console.log("inside save shoes function")
            console.log(err);
        });
    }

    const handleChange = (e) => {
        const {name, value} = e.target;

        setShoes((prevState => {
            return {
                ...prevState,
                [name]: value
            };
        }));
    }

    return (
        <Modal show={show}>
            <form onSubmit={(e) => saveShoes(e)}
            noValidate
            className={submitted ? 'was-validated' : ''}>
                <div className="modal-header">
                    <h5 className="modal-title">Shoes Details</h5>
                    <button type="button" className="btn-close" onClick={() => setShow(false)}></button>
                </div>

                <div className="modal-body">

                    {errorMessage &&
                    <div className="alert alert-danger">
                        {errorMessage}
                    </div>
                    }

                    <div className="form-group">
                        <label htmlFor="shoesName"> Shoes name:</label>
                        <input
                            type="text"
                            name="shoesName"
                            placeholder="shoes name"
                            className="form-control"
                            value={shoes.shoesName}
                            onChange={(e)=> handleChange(e)}
                            required
                        />

                        <div className="invalid-feedback">
                            name is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="brand">Brand</label>
                        <input
                            type="text"
                            name="brand"
                            placeholder="brand"
                            className="form-control"
                            value={shoes.brand}
                            onChange={(e)=> handleChange(e)}
                            required
                        />

                        <div className="invalid-feedback">
                            brand is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">description</label>
                        <textarea
                            type="text"
                            name="description"
                            placeholder="description"
                            className="form-control"
                            value={shoes.description}
                            onChange={(e)=> handleChange(e)}
                            required
                        />

                        <div className="invalid-feedback">
                            description is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="size">size</label>
                        <input
                            type="text"
                            name="size"
                            placeholder="size"
                            className="form-control"
                            value={shoes.size}
                            onChange={(e)=> handleChange(e)}
                            required
                        />

                        <div className="invalid-feedback">
                            size is required.
                        </div>
                    </div>

                    <div className="form-group">
                        <label htmlFor="price">Price: </label>
                        <input
                            type="number"
                            min="1"
                            step="any"
                            name="price"
                            placeholder="price"
                            className="form-control"
                            value={shoes.price}
                            onChange={(e)=> handleChange(e)}
                            required
                        />

                        <div className="invalid-feedback">
                            price is required.
                        </div>
                    </div>

                </div>

                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={() => setShow(false)}>Close</button>
                    <button type="submit" className="btn btn-primary">Save Changes</button>
                </div>
            </form>
        </Modal>
    );

});

export {ShoesSave}