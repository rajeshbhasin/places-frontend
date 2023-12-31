import React, { useState, useContext } from 'react';
import { useParams, useHistory } from 'react-router-dom';

import Card from '../../shared/components/UIElements/Card';
import Button from '../../shared/components/FormElements/Button';
import Modal from '../../shared/components/UIElements/Modal';
import Map from '../../shared/components/UIElements/MyMap';
import ErrorModal from '../../shared/components/UIElements/ErrorModal';
import { AuthContext } from '../../shared/context/auth-context';
import { useHttpClient } from '../../shared/hooks/http';

import './PlaceItem.css';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';

function PlaceItem(props) {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [showMap, setShowMap] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const openMapHandler = () => setShowMap(true);
  const closeMapHandler = () => setShowMap(false);

  const openDeleteHandler = () => setShowDeleteModal(true);
  const closeDeleteHandler = () => setShowDeleteModal(false);
  const confirmDelete = async () => {
    setShowDeleteModal(false);
    try {
      await sendRequest(
        process.env.REACT_APP_BACKEND_URL + `/api/places/${props.id}`,
        'DELETE',
        null,
        {
          Authorization: 'Bearer ' + auth.token,
        }
      );
      props.onDelete(props.id);
      console.log('Item deleted');
    } catch (error) {}
  };

  return (
    <>
      <ErrorModal error={error} onClear={clearError} />
      <Modal
        show={showMap}
        onCancel={closeMapHandler}
        header={props.address}
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={<Button onClick={closeMapHandler}>Close</Button>}
      >
        <div className="map-container">
          <h2>Placeholder Map here </h2>
        </div>
      </Modal>
      <Modal
        show={showDeleteModal}
        onCancel={closeDeleteHandler}
        header="Are you sure?"
        contentClass="place-item__modal-content"
        footerClass="place-item__modal-actions"
        footer={
          <>
            <Button danger onClick={confirmDelete}>
              Yes
            </Button>
            <Button inverse onClick={closeDeleteHandler}>
              No
            </Button>
          </>
        }
      >
        <p>Are you sure?</p>
      </Modal>
      <li className="place-item">
        <Card className="place-item__content">
          {isLoading && <LoadingSpinner asOverlay />}
          <div className="place-item__image">
            <img
              src={process.env.REACT_APP_BACKEND_URL + `/${props.image}`}
              alt={props.title}
            />
          </div>
          <div className="place-item__info">
            <h2>{props.title}</h2>
            <h3>{props.address}</h3>
            <p>{props.description}</p>
          </div>
          <div className="place-item__actions">
            <Button inverse onClick={openMapHandler}>
              View On Map
            </Button>
            {auth.userId === props.creatorId && (
              <Button to={`/places/${props.id}`}>Edit</Button>
            )}
            {auth.userId === props.creatorId && (
              <Button danger onClick={openDeleteHandler}>
                Delete
              </Button>
            )}
          </div>
        </Card>
      </li>
    </>
  );
}

export default PlaceItem;
