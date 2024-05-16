import { useEffect, useState } from "react";
import headerimg from "../../../assets/images/home-avatar.svg";
import axios from "axios";
import { Table } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import noDataImg from "../../../assets/images/no-data.png";
import "./RecipesList.css";
import Modal from "react-bootstrap/Modal";
import { useNavigate } from "react-router-dom";
import Header from "../../SharedModule/components/Header/Header";
import NoData from "../../SharedModule/components/NoData/NoData";
import DeleteData from "../../SharedModule/components/DeleteData/DeleteData";
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';

interface GetRecipesParams {
  pageSize: number;
  pageNo: number;
}

export default function RecipesList() {

  const navigate = useNavigate();

  const [recipesList, setRecipesList] = useState([]);

  const [recipeId, setRecipeId] = useState("");

 
  const [showDelete, setShowDelete] = useState(false);

  const handleDeleteClose = () => setShowDelete(false);

  const handleDeleteShow = (id:any) => {
    setRecipeId(id);
    setShowDelete(true);
  };

  


  const getRecipesList = async ( { pageSize, pageNo }: GetRecipesParams) => {
    try {
      let response = await axios.get(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/?pageSize=${pageSize}&pageNumber=${pageNo}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
         
        }
      );
      console.log(response.data.data);

      setRecipesList(response.data.data);
     
    } catch (error) {
      // console.log(error);
    }
  };

  //Delete Recipe
  const handleDeleteSubmit = async () => {
    try {
      let response = await axios.delete(
        `https://upskilling-egypt.com:3006/api/v1/Recipe/${recipeId}`,
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        }
      );
      handleDeleteClose();
      getRecipesList();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRecipesList( 5, 1);
    
    
  }, []);

  const goToRecipeData = () => {
    navigate("/dashboard/recipeData");
  };


  return (
    <>
      <Header
        title={"Welcome Upskilling!"}
        description={
          "This is a welcoming screen for the entry of the application , you can now see the options"
        }
        imgUrl={headerimg}
      />
      <Modal show={showDelete} onHide={handleDeleteClose}>
        <Modal.Header closeButton>
          <h2>Delete Recipe</h2>
        </Modal.Header>
        <Modal.Body>
          <DeleteData deleteItem={"Recipe"} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={handleDeleteSubmit}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="container-fluid">
        <div className="row p-4">
          <div className="col-md-6">
            <h4>Recipes Table Details</h4>
            <span>You can check all details</span>
          </div>
          <div className="col-md-6 d-flex justify-content-end">
           
              <button className="btn btn-success " onClick={goToRecipeData}>
                Add New Item
              </button>
            
              
            
          </div>
        </div>
       
        {/* array of recipe items */}
        <Table striped hover>
          <thead className="table-secondary">
            <tr>
              <th>#</th>
              <th>Item Name</th>

              <th>Image</th>
              <th>Price</th>
              <th>Description</th>
              <th>Category</th>
              <th>Tag</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {recipesList.length > 0 ? (
              recipesList.map((item:any, index) => (
                <tr key={item.id}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>

                  <td>
                    {item.imagePath ? (
                      <img
                        className="smallImg img-fluid rounded"
                        src={
                          "https://upskilling-egypt.com:3006/" + item.imagePath
                        }
                        alt="Responsive image"
                      />
                    ) : (
                      <img
                        className="smallImg img-fluid rounded"
                        src={noDataImg}
                        alt="Responsive image"
                      />
                    )}
                  </td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>{item.category[0]?.name}</td>
                  <td>{item.tag.name}</td>

           

                 
                    <td>
                      <button className="btn">
                      <VisibilityIcon />
                       
                      </button>
                      <button onClick={() => handleDeleteShow(item.id)} className="btn">
                      <DeleteIcon  />
                       
                      </button>
                    </td>
                  
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </Table>
      </div>
    </>
  );
}
