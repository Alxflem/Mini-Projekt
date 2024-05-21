from DatabaseConnection import Database

def register_interest(type_name, email):
    connection = None
    cursor = None

    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        # Assuming you have a function to get the user_id from the email
        user_id = get_user_id_by_email(email, connection)
        if not user_id:
            return {"error": "User not found"}, 404

        # Assuming you have a function to get the type_id from the type_name
        type_id = get_type_id_by_name(type_name, connection)
        if not type_id:
            return {"error": "Product type not found"}, 404

        # Insert the interest into the database
        query = """
        INSERT INTO registred_interest (u_id, pt_id) 
        VALUES (%s, %s)
        RETURNING interest_id
        """
        cursor.execute(query, (user_id, type_id))
        connection.commit()
        interest_id = cursor.fetchone()[0]

        return {"message": "Interest registered successfully", "interest_id": interest_id}, 201

    except Exception as e:
        if connection:
            connection.rollback()
        print("Error in register_interest:", str(e))
        return {"error": "Internal server error"}, 500

    finally:
        if cursor:
            cursor.close()
        if connection:
            db_instance.return_connection(connection)

def get_user_id_by_email(email, connection):
    query = "SELECT u_id FROM user_account WHERE email = %s"
    cursor = connection.cursor()
    cursor.execute(query, (email,))
    result = cursor.fetchone()
    cursor.close()
    return result[0] if result else None

def get_type_id_by_name(type_name, connection):
    query = "SELECT pt_id FROM product_type WHERE type_name = %s"
    cursor = connection.cursor()
    cursor.execute(query, (type_name,))
    result = cursor.fetchone()
    cursor.close()
    return result[0] if result else None
