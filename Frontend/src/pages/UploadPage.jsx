import React, { useState } from "react";
import { Box, Button, Typography, Card, CardContent, Alert } from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const UploadPage = ({ setSummary }) => {
  const [pdfUploaded, setPdfUploaded] = useState(false); // Estado para verificar si el PDF ha sido subido
  const [selectedFile, setSelectedFile] = useState(null); // Estado para almacenar el archivo seleccionado
  const [loading, setLoading] = useState(false); // Estado para verificar si está procesando el resumen
  const [error, setError] = useState(""); // Estado para almacenar mensajes de error
  const [dragActive, setDragActive] = useState(false); // Estado para el estado activo del drag
  const navigate = useNavigate();

  // Función para manejar la selección del archivo desde el input
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file); // Guardar el archivo PDF seleccionado
      setPdfUploaded(true); // Marcar el PDF como subido
      setError(""); // Limpiar cualquier error anterior
      setDragActive(false);
    } else {
      setError("Por favor, selecciona un archivo PDF válido.");
      setPdfUploaded(false);
    }
  };

  // Función para manejar el arrastre de archivos
  const handleDragOver = (e) => {
    e.preventDefault();
    setDragActive(true);
  };

  const handleDragLeave = () => {
    setDragActive(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file && file.type === "application/pdf") {
      setSelectedFile(file); // Guardar el archivo PDF soltado
      setPdfUploaded(true); // Marcar el PDF como subido
      setError(""); // Limpiar cualquier error anterior
      setDragActive(false);
    } else {
      setError("Por favor, selecciona un archivo PDF válido.");
      setPdfUploaded(false);
    }
  };

  // Función para generar el resumen y enviar el PDF al backend
  const handleGenerateSummary = async () => {
    if (!pdfUploaded) {
      setError("No se ha subido un archivo válido para generar el resumen.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("pdf", selectedFile);

    try {
      // Enviar el PDF al backend y obtener las ideas principales
      const response = await axios.post("http://localhost:3000/api/pdf", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      // Asegúrate de que la respuesta contenga las ideas principales como se espera
      if (response.data && response.data.ideasPrincipales) {
        const ideasPrincipales = response.data.ideasPrincipales;
        setSummary(ideasPrincipales); // Guardar las ideas principales en el estado
        navigate("/resumen", { state: { ideasPrincipales } }); // Pasar las ideas a la página siguiente
      } else {
        // Manejar la situación donde no se reciben ideas como esperado
        setError("No se recibieron ideas del documento procesado.");
      }
    } catch (error) {
      setError(`Hubo un problema al procesar el archivo. Intenta de nuevo: ${error.response ? error.response.data.message : error.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Subir PDF
      </Typography>
      <Card sx={{ backgroundColor: "#FEFEFE", maxWidth: 600, margin: "auto", textAlign: "center", p: 4 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Añade un archivo PDF para empezar
          </Typography>

          {/* Mostrar mensajes de error si los hay */}
          {error && (
            <Alert severity="error" sx={{ marginBottom: 2 }}>
              {error}
            </Alert>
          )}

          <Box
            sx={{
              border: dragActive ? "2px dashed #4A90E2" : "2px dashed #ccc",
              p: 4,
              textAlign: "center",
              borderRadius: "8px",
              marginBottom: "20px",
              backgroundColor: dragActive ? "#E3F2FD" : "transparent",
            }}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <Typography variant="body2" color="textSecondary" paragraph>
              Arrastra y suelta aquí tu archivo PDF o haz clic para subirlo
            </Typography>

            {/* Input de archivo */}
            <input
              type="file"
              accept="application/pdf"
              onChange={handleFileChange}
              style={{ display: "none" }}
              id="pdf-upload"
            />
            <label htmlFor="pdf-upload">
              <Button
                variant="contained"
                color="primary"
                component="span"
                sx={{ marginRight: 2 }}
              >
                {pdfUploaded ? "PDF Subido" : "Subir PDF"}
              </Button>
            </label>

            {/* Botón para generar el resumen */}
            <Button
              variant="contained"
              color="secondary"
              onClick={handleGenerateSummary}
              disabled={!pdfUploaded || loading} // Deshabilitado si no hay PDF subido o si está cargando
            >
              {loading ? "Generando Resumen..." : "Generar Resumen"}
            </Button>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default UploadPage;