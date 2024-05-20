from DatabaseConnection import Database

def add_product_to_history(user_id, product_id):

    try:
        db_instance = Database.get_instance()
        connection = db_instance.get_connection()
        cursor = connection.cursor()

        cursor.execute("INSERT INTO purchase_history(user_id, product_id) VALUES (%s, %s)", (user_id, product_id))

        connection.commit()
        cursor.close()
        db_instance.return_connection(connection)
        return {"message": "Product registered successfully!"}, 201
    except Exception as e:
        print(f"Failed to register product: {e}")
        return {"error": "Failed to register product"}, 500
    finally:
        if 'db_instance' in locals() and db_instance:
            db_instance.close_all_connections()