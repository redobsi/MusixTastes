import firebase_admin
from firebase_admin import credentials
from firebase_admin import db
from pprint import pprint

class CustomFirebaseSDK:
    def __init__(self, database_url: str, certification_path: str, standard_ref: str = '/') -> None:
        """
        Initialize FirebaseSDK with database URL and certification path.

        Args:
        - database_url (str): The URL of the Firebase Realtime Database.
        - certification_path (str): The file path to the service account credentials JSON file.
        - standard_ref (str): The default reference path in the Firebase database. Default is '/' (root).
        """
        self._database_url = database_url
        self._certification_path = certification_path
        # Initializing the db
        self._init_db()
        self._ref_path = standard_ref if isinstance(standard_ref, str) else '/'

    # ------------------ PRIVATE METHODS ------------------ #

    def _init_db(self) -> None:
        """
        Initialize Firebase app using service account credentials.

        Raises:
        - ValueError: If the certification path is invalid or the credentials file is not found.
        - firebase_admin.exceptions.FirebaseError: If the Firebase app fails to initialize.
        """
        try:
            self._cred = credentials.Certificate(self._certification_path)
            firebase_admin.initialize_app(self._cred, {'databaseURL': self._database_url})
        except Exception as e:
            raise ValueError("Failed to initialize Firebase app. Please check the certification file.") from e


    def _get_ref(self, ref_path: str = None) -> db.Reference:
        """
        Get a reference to a specific path in the Firebase database.

        Args:
        - ref_path (str): The path to the desired location in the Firebase database. Default is None, which returns the root reference.

        Returns:
        - db.Reference: A reference to the specific path in the Firebase database.

        Raises:
        - TypeError: If the provided ref_path is not a string.
        """
        # Check type
        if ref_path is None:
            return db.reference(self._ref_path)
        elif not isinstance(ref_path, str):
            raise TypeError('The reference path should be a string not a '
                            f'{type(ref_path).__name__}')
        else:
            return db.reference(ref_path)
    
        
    # ------------------- PUBLIC METHODS --------------------- #
    # Getters
    @property
    def ref(self) -> db.Reference:
        """
        Get the root reference of the Firebase database.

        Returns:
        - db.Reference: The root reference of the Firebase database.
        """
        return self._get_ref(self._ref_path)
    
    @property
    def ref_path(self) -> str:
        """
        Get the current reference path in the Firebase database.
        
        Returns:
            str: The current reference path in the Firebase database.
        """
        return self._ref_path
    
    # Setters
    def update_ref(self, ref_path: str, is_relative: bool = True, force_check: bool = True) -> None:
        """
        Set the root reference to a specific path in the Firebase database.

        Args:
        - ref_path (str): The path to the desired location in the Firebase database.
        - is_relative (bool): If True, the ref_path is considered relative to the current reference.
                            If False, the ref_path is considered absolute. Default is True.
        - force_check (bool): If True, force check if the reference exists in the database.
                            Default is True.

        Raises:
        - KeyError: If the specified reference path doesn't exist in the database
                    and force_check is True.
        """
        if is_relative:
            # Split the relative path into parts
            current_refs = [ref for ref in self._ref_path.split('/') if ref != '']
            passed_refs = [ref for ref in ref_path.split('/') if ref != '']
            ref_path = '/'.join((current_refs[:-passed_refs.count('..')] or current_refs) + [ref for ref in passed_refs if ref != '..'])    
        check_ref = db.reference(ref_path)
        if force_check:
            snapshot_check = check_ref.get()
            if snapshot_check is None:
                raise KeyError(f'The reference "{check_ref.path}"'
                                ' doesn\'t exist')

        self._ref_path = ref_path
    
    # ----------------- COMMUNICATION METHODS ----------------- #
    # GET METHODS
    def get_data(self, ref_path: str = None) -> dict:
        """
        Get data from a specific path in the Firebase database.

        Args:
        - ref_path (str): The path to the desired location in the Firebase database. Default is None, which returns data from the root reference.

        Returns:
        - dict: The retrieved data from the specified path in the Firebase database.
        """
        ref = self._get_ref(ref_path)
        return ref.get()

    # SET METHODS
    def post_data(self, data: dict, ref_path: str = None) -> None:
        """
        Set data at a specific path in the Firebase database.

        Args:
        - data (dict): The data to be set in the Firebase database.
        - ref_path (str): The path to the desired location in the Firebase database. Default is None, which sets data at the root reference.
        """
        ref = self._get_ref(ref_path)
        ref.set(data)
    
    # UPDATE METHODS
    def update_data(self, data_to_update: dict, ref_path: str = None) -> None:
        """
        Update data at a specific path in the Firebase database.

        Args:
        - data (dict): The data to be updated in the Firebase database.
        - ref_path (str): The path to the desired location in the Firebase database. Default is None, which updates data at the root reference.
        """
        ref = self._get_ref(ref_path)
        ref.update(data_to_update)
    
    # DELETE METHODS
    def delete_data(self, ref_node: str) -> None:
        """
        Delete data at a specific path in the Firebase database.
        
        Args:
            ref_node (str): The reference node in the Firebase database where the data will be deleted.
            
        Returns:
            None
        """
        ref_path = "{}/{}".format(self._ref_path, ref_node)  # Linked between the source ref path and the ref node path
        ref = self._get_ref(ref_path)
        ref.delete()

