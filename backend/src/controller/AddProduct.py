from DatabaseConnection import Database

def add_product(name, p_type_id, price, image_url, production_date, color, condition, seller):
    connection = None
    cursor = None

    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        print("Obtained connection from pool")

        # Get user ID from email
        cursor.execute("SELECT u_id FROM user_account WHERE email = %s", (seller,))
        result = cursor.fetchone()
        if result is None:
            raise ValueError("Seller not found")
        u_id = result[0]

        print(f"User ID: {u_id}")

        # Insert the product using the integer type ID
        cursor.execute(
            "INSERT INTO product (name, type, price, image, production_date, color, condition, available, seller) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s)",
            (name, p_type_id, price, image_url, production_date, color, condition, True, u_id)
        )

        connection.commit()
        print("Product registered successfully")
        return {"message": "Product registered successfully!"}, 201

    except Exception as e:
        print(f"Failed to register product: {e}")
        return {"error": f"Failed to register product: {e}"}, 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            print("Returning connection to pool")
            db_instance.return_connection(connection)
