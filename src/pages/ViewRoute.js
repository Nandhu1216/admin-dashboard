import { GoogleMap, Marker, Polyline, useJsApiLoader } from "@react-google-maps/api";
import { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "../components/Layout";

const libraries = ["places"];

function ViewRoute() {

    const { id } = useParams();
    const navigate = useNavigate();

    const [route, setRoute] = useState(null);

    const { isLoaded } = useJsApiLoader({
        id: "google-map-script",
        googleMapsApiKey: "AIzaSyD6C7mjOhiZFmQRZHryeCFIRSrtuEvehWU",
        libraries
    });

    useEffect(() => {

        const fetchRoute = async () => {
            try {
                const res = await axios.get(`http://localhost:5000/api/routes/${id}`);
                setRoute(res.data);
            } catch (err) {
                console.log(err);
            }
        };

        fetchRoute();

    }, [id]);


    if (!isLoaded || !route) return <Layout><h3>Loading Route...</h3></Layout>;

    return (
        <Layout>

            <div style={{ height: "85vh", position: "relative" }}>

                {/* TOP BAR */}
                <div style={topBar}>
                    <button
                        onClick={() => navigate("/routes")}
                        style={backBtn}
                    >
                        ← Back
                    </button>

                    <h3 style={{ margin: 0 }}>{route.routeName}</h3>
                </div>

                {/* MAP */}
                <GoogleMap
                    mapContainerStyle={{ width: "100%", height: "100%" }}
                    center={route.checkpoints[0]}
                    zoom={14}
                >

                    {/* ROUTE LINE */}
                    <Polyline
                        path={route.checkpoints}
                        options={{
                            strokeColor: "#3b82f6",
                            strokeWeight: 4
                        }}
                    />

                    {/* MARKERS */}
                    {route.checkpoints.map((point, index) => (
                        <Marker key={index} position={point} />
                    ))}

                </GoogleMap>

            </div>

        </Layout>
    );
}

/* STYLES */

const topBar = {
    position: "absolute",
    top: 10,
    left: 10,
    background: "#1e293b",
    padding: "10px 15px",
    borderRadius: "8px",
    zIndex: 10,
    color: "white",
    display: "flex",
    alignItems: "center",
    gap: "15px"
};

const backBtn = {
    padding: "6px 12px",
    border: "none",
    background: "#475569",
    color: "white",
    borderRadius: "6px",
    cursor: "pointer"
};

export default ViewRoute;
