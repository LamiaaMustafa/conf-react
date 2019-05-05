import React,{Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle,Breadcrumb ,BreadcrumbItem, Button,Modal, 
ModalBody,ModalHeader,Row, Label,Col } from 'reactstrap';
import {Link} from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';

const required=(val)=>val && val.length;
const maxLength=(len)=>(val)=> !(val) || (val.length<=len);
const minLength=(len)=>(val)=>(val) && (val.length>=len);

class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOpen: false
        }
        this.toggleModal=this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);

    }
    handleSubmit(values) {
        console.log('Current State is: ' + JSON.stringify(values));
        alert('Current State is: ' + JSON.stringify(values));
    }
    
    toggleModal(){
        this.setState({
            isModalOpen:!this.state.isModalOpen
        });
    }
    
    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}><span className="fa fa-pencil fa-lg"></span> Submit Comment</Button>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values)=>this.handleSubmit(values)}>
                            <Row className="form-group">
                                <Label htmlFor="rating" md={12}>Rating</Label>
                                <Col md={12}>
                                    <Control.select model=".rating" name="rating" id="rating"
                                        className="form-control"
                                        >
                                        <option>1</option>
                                        <option>2</option>
                                        <option>3</option>
                                        <option>4</option>
                                        <option>5</option>
                                    </Control.select>

                                </Col>
                            </Row>
                            <Row className="form-group" row>
                                <Label htmlFor="yourname" md={12}>Your Name</Label>
                                <Col md={12}>
                                    <Control.text model=".yourname" id="yourname" name="yourname"
                                        placeholder="Your Name"
                                        className="form-control"
                                        validators={{
                                            required, minLength: minLength(3), maxLength:maxLength(15)
                                        }}
                                        />
                                    <Errors
                                        className="text-danger"
                                        model=".yourname"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                        }}
                                    />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Label htmlFor="comment" md={12}>Comment</Label>
                                <Col md={12}>
                                    <Control.textarea model=".comment" id="comment" name="comment"
                                        rows="6"
                                        className="form-control"
                                        />
                                </Col>
                            </Row>
                            <Row className="form-group">
                                <Col md={12}>
                                    <Button type="submit" color="primary">
                                        Submit
                                    </Button>
                                </Col>
                            </Row>
                        </LocalForm>

                    </ModalBody>    
                </Modal>    
           </div> 
        );
    }

}
    function RenderDish({dish}) {
            if (dish != null)
                return(
                    <div className="col-12 col-md-5 m-1">
                        <Card>
                            <CardImg top src={dish.image} alt={dish.name} />
                            <CardBody>
                            <CardTitle>{dish.name}</CardTitle>
                            <CardText>{dish.description}</CardText>
                            </CardBody>
                        </Card>
                    </div>
                );
            else
                return(
                    <div></div>
                );
        }
    function RenderComments({comments}){
            if(comments!=null)
                return(
                    <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <ul className="list-unstyled">
                        {comments.map((com)=>{
                            return(
                                <div>
                                   
                                    <li>
                                        <p>{com.comment}</p>  
                                    
                                        <p>-- {com.author} , {new Intl.DateTimeFormat('en-US',{year:'numeric',month:'short',day:'2-digit'}).format(new Date(Date.parse(com.date))) } </p>
                                        </li>
                                </div>    
                            );
                        }) 
                       
                        } 
                    </ul>
                    <CommentForm/>
                    
                    </div>
                );
            else
                return(
                    <div></div>
                );
           
                
        }
        const DishDetail=(props)=>{
            if(props.dish)
            return(
                <div className="container">
                    <div className="row">
                        <Breadcrumb>
                            <BreadcrumbItem><Link to='/menu'>Menu</Link></BreadcrumbItem>
                            <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                        </Breadcrumb>
                        <div className="col-12">
                            <h3>{props.dish.name}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                           <RenderDish dish={props.dish}/>    
                            <RenderComments comments={props.comments}/>
                        
                    </div>
                </div>

                );
            else
                return(
                    <div></div>
                );    
        } 
    
    

    export default DishDetail ;