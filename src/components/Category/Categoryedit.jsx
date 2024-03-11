import React, { useEffect, useState } from 'react'
import { Button, MenuItem, Select, TextField } from '@mui/material'
import axios from 'axios'
import Topbar from '../Adminpanel/Topbar'
import Sidebar from '../Adminpanel/Sidebar'
import './Category.css'



const Categoryedit = (props) => {
    var[inputs,setInputs]=useState(props.data)
    var[selectedimage,setSelectedimage]=useState(null);

    const inputHandler=(event)=>
    {

        const { name, value } =event.target
        setInputs((inputs) => ({ ...inputs,[name]: value }))
        console.log(inputs)
    }
    const savedata=()=>{
      const formdata=new FormData();
      formdata.append('name',inputs.name);
      formdata.append('offer_price',inputs.offer_price);
      formdata.append('MRP',inputs.MRP);
      formdata.append('category',inputs.category);
      formdata.append('image1',selectedimage)
      fetch(`http://localhost:3005/edit/${inputs._id}`,
      {
          method:'post',
          body:formdata,
      })
      .then((response)=>response.json())
      .then((data)=>{
          alert("record saved")
      })
      .catch((err)=>{
          console.log("error")
      })
  }
  const handleimage =(event)=>{
    const file = event.target.files[0];
    setSelectedimage(file)
    inputs.image1=file;
    }
  return (
    <div>
      <Topbar/>
      <Sidebar/>
      <h2>Edit Products</h2>
    
  
  {/* <FormControl sx={{ m: 1, minWidth: 120 }}> */}
  <TextField label="Product name" name="name" variant="filled" value={inputs.name}onChange={inputHandler}>
    </TextField> <br /><br />
    <TextField  label="offer price" type='text' name="offer_price" variant="filled" value={inputs.offer_price}onChange={inputHandler}/><br /><br />
    <TextField  label="MRP" type='text' name="MRP" variant="filled" value={inputs.MRP}onChange={inputHandler}/><br /><br />
    <Select
   labelId="demo-simple-select-label"
    name='category'value={inputs.category} onChange={inputHandler}>
   <MenuItem value="Vegetables">Vegetables</MenuItem>
        <MenuItem value="Fruits">Fruits</MenuItem>
        <MenuItem value="Others">Others</MenuItem>
  </Select><br /><br />
{/* </FormControl><br/><br/> */}
<label>Upload file</label>
        <input type="file" onChange={handleimage}></input>
        <br /><br />
  <Button variant="contained" onClick={savedata} >Update</Button>
  </div>
    
  )
}

export default Categoryedit


// import React, { useState } from 'react';
// import { Button, FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material';
// import { Home } from '@mui/icons-material';
// import axios from 'axios';
// import Topbar from '../Adminpanel/Topbar';
// import Sidebar from '../Adminpanel/Sidebar';
// import './Category.css';

// const Category = (props) => {
//   var[inputs,setInputs]=useState(props.data)
//       var[selectedImage,setSelectedImage]=useState(null);
//       const [previewImage, setPreviewImage] = useState('');

  
//       // const handleInputChange=(event)=>
//       // {
  
//       //     const { name, value } =event.target
//       //     setInputs((inputs) => ({ ...inputs,[name]: value }))
//       //     console.log(inputs)

//       // }
//       const handleInputChange = (event) => {
//         const file = event.target.files[0];
//         setSelectedImage(file);
//         setPreviewImage(URL.createObjectURL(file));
//       };
    

//   const updatedata = () => {
//     const formData = new FormData();
//     formData.append('name', inputs.name);
//     formData.append('offer_price', inputs.offer_price);
//     formData.append('MRP', inputs.MRP);
//     formData.append('category', inputs.category);
//     formData.append('image1', selectedImage);
//     fetch(`http://localhost:3005/edit/${inputs._id}`,
//     {
//         method:'put',
//         body:formData,
//     })
//     .then((response)=>response.json())
//     .then((data)=>{
//         alert("record saved")
//         setSelectedImage(null);
//         setPreviewImage('');
//     })
//     .catch((err)=>{
//         console.log("error")
//     })
// }

//   return (
//     <div>
//       <Topbar />
//       <Sidebar />
//       <div className="add-product">
//         <div className="form-container">
//           <h2>Product Details</h2>
//           <TextField
//             label="Product Name"
//             type="text"
//             name="name"
//             value={inputs.name}
//             onChange={handleInputChange}
//           /><br /><br />
//           <TextField
//             label="Offer Price"
//             type="text"
//             name="offer_price"
//             value={inputs.offer_price}
//             onChange={handleInputChange}
//           /><br /><br />
//           <TextField
//             label="MRP"
//             type="text"
//             name="MRP"
//             value={inputs.MRP}
//             onChange={handleInputChange}
//           /><br /><br />
//           <FormControl>
//             <InputLabel>Product Category</InputLabel>
//             <Select
//               name="category"
//               value={inputs.category}
//               onChange={handleInputChange}
//             >
//               <MenuItem value="Vegetables">Vegetables</MenuItem>
//               <MenuItem value="Fruits">Fruits</MenuItem>
//               <MenuItem value="Others">Others</MenuItem>
//             </Select><br /><br />
//           </FormControl>
//           <div>
//             <label>Upload File</label>
//             <input type="file" onChange={setSelectedImage} />
//           </div>
//           <br /><br />
//           <Button variant="contained" color="primary" onClick={updatedata}>
//             Update
//           </Button>
//         </div>
//         {previewImage && (
//           <div className="preview-container">
//             <h3>Image Preview:</h3>
//             <img src={previewImage} alt="Selected Image" className="preview-image" />
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default Categoryed;
