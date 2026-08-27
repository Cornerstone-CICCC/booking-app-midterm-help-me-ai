INSERT INTO bookings (
  reference_number, customer_name, email, phone, pet_name, pet_type, pet_breed, pet_size, service, duration_minutes, starting_price, booking_date, booking_time, notes, status
)
VALUES 
  ('PAW-84920', 'Joy Kosol', 'joy@example.com', '604-555-0101', 'Mochi', 'dog', 'Maltese', 'small', 'full_groom', 90, 75.00, CURRENT_DATE, '10:30 AM', 'Very sensitive around ears', 'pending'),
  ('PAW-84921', 'Alex Chen', 'alex@example.com', '604-555-0102', 'Luna', 'cat', 'Persian', 'small', 'bath_and_brush', 60, 45.00, CURRENT_DATE, '12:00 PM', NULL, 'confirmed'),
  ('PAW-84922', 'Sam Wilson', 'sam@example.com', '604-555-0103', 'Teddy', 'dog', 'Poodle', 'medium', 'nail_trim', 20, 20.00, CURRENT_DATE, '1:30 PM', 'Gets nervous with nail clippers', 'confirmed'),
  ('PAW-84923', 'Mia Lee', 'mia@example.com', '604-555-0104', 'Nori', 'dog', 'Husky', 'large', 'deshedding_treatment', 75, 60.00, CURRENT_DATE + INTERVAL '1 day', '9:00 AM', 'Heavy shedding coat', 'completed'),
  ('PAW-84924', 'Taylor Brown', 'taylor@example.com', '604-555-0105', 'Charlie', 'dog', 'Golden Retriever', 'medium', 'puppys_first_groom', 45, 40.00, CURRENT_DATE + INTERVAL '1 day', '3:00 PM', 'First time at a groomer!', 'cancelled')
ON CONFLICT (reference_number) DO NOTHING;

INSERT INTO users (name, email, password, role)
VALUES 
  ('Admin Staff', 'staff@pawfectday.com', '$2b$10$VmoQzkjY88HyMsmvONHub.LR9YzMd2Yiwh5F0dYvZNBI4jy5YpXmK', 'admin'),
  ('Makoto Arata', 'makoto.a@pawfectday.com', '$2b$10$VmoQzkjY88HyMsmvONHub.LR9YzMd2Yiwh5F0dYvZNBI4jy5YpXmK', 'staff')
ON CONFLICT (email) DO NOTHING;
