
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import FormParser, MultiPartParser

from .models import UploadedFile
from .serializer import FileUploadSerializer

class FileUploadAPIView(APIView):
    parser_classes = (MultiPartParser, FormParser)
    serializer_class = FileUploadSerializer
    
    def post(self, request, *args, **kwargs):
        serializer = self.serializer_class(data=request.data)
        if serializer.is_valid():
            serializer.save()
            file_instance = serializer.instance
            res = {
                "data": {
                    "id": file_instance.id,
                    "uploaded_on": file_instance.uploaded_on,
                    "file": file_instance.file.url  
                }
            }
            return Response(
                res,
                status=status.HTTP_201_CREATED
            )
        
        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
    
class FileRetrieveAPIView(APIView):
        def get(self, request, pk, *args, **kwargs):
            try:
               file_instance = UploadedFile.objects.get(id=pk)
               serializer = FileUploadSerializer(file_instance)
               return Response(serializer.data, status=status.HTTP_200_OK)
            except UploadedFile.DoesNotExist:
               return Response({"detail": "File not found"}, status=status.HTTP_404_NOT_FOUND)
       
