import React, { useState } from 'react';
import { Modal, ModalHeader, ModalBody, ModalFooter, Button } from '@windmill/react-ui';

const RatingModal = ({ isOpen, onClose, onSubmit, booking }) => {
    const [rating, setRating] = useState(0);

    const handleSubmit = () => {
        if (rating < 1 || rating > 5) {
            alert('Please select a rating between 1 and 5.');
            return;
        }
        onSubmit({ user_id: booking.user_id._id, chef_id: booking.chef_id._id, rating });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <ModalHeader>Rate your mate!</ModalHeader>
            <ModalBody>
                {/* <p>Rate your experience with {booking.chef_id?.name || 'the chef'}:</p> */}
                <div className="flex justify-center">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <button
                                key={star}
                                onClick={() => setRating(star)}
                                style={{
                                  color: star <= rating ? '#793deb' : '#D1D5DB', // Use inline styles here
                                  fontSize: '2rem', // Set font size directly
                              }}
                            >
                                ★
                            </button>
                        ))}
                    </div>
            </ModalBody>
            <ModalFooter>
                <Button layout="outline" onClick={onClose}>
                    Cancel
                </Button>
                <Button onClick={handleSubmit} disabled={rating === 0}>Submit Rating</Button>
            </ModalFooter>
        </Modal>
    );
};

export default RatingModal;
