import React, { useState } from "react";
import { Container, FormGroup } from "reactstrap";
import axios from "axios";

function CloudImage({ onImageUpload }) { // Agrega una función de devolución de llamada como prop
    const cloudName = 'pfhenry';
    const preset_key = "pfhenry_preset";
    const [image, setImage] = useState(null);
  
    const handlerFile = async (e) => {
      const file = e.target.files[0];
      const formData = new FormData();
      formData.append('file', file);
      formData.append("upload_preset", preset_key);
  
      const response = await axios.post(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, formData);
      const data = response?.data;
      const imageUrl = data.secure_url;
      setImage(imageUrl);
  
      // Llama a la función de devolución de llamada con la URL de la imagen
      onImageUpload(imageUrl);
    }


  return (
    <div>
      <Container>
        <p>
          Tu imagen:
        </p>
        <FormGroup>
          <input
            type="file"
            name="file"
            id="image"
            onChange={handlerFile}
            required
          />
        </FormGroup>
        {image && (
          <div>
            <p>Imagen subida:</p>
            <img src={image} alt="Preview" className="img-fluid" />
          </div>
        )}

      </Container>
    </div>
  )
}

export default CloudImage;