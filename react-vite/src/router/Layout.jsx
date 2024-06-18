import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import { ModalProvider, Modal } from "../context/Modal";
import { thunkAuthenticate } from "../redux/session";
import Navigation from "../components/Navigation/Navigation";
import { MapsProvider } from "../context/mapsContext";
import LocationPromptModal from "../components/LocationPromptModal";

export default function Layout() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    dispatch(thunkAuthenticate()).then(() => setIsLoaded(true));
  }, [dispatch]);

  return (
    <>
      <ModalProvider>
        <MapsProvider>
          <Navigation />
          <div className="whole-lower-body">
            <div className="main-container">
              {/* <LocationPromptModal /> */}
              {isLoaded && <Outlet />}
              <Modal />
            </div>
          </div>
        </MapsProvider>
      </ModalProvider>
    </>
  );
}
