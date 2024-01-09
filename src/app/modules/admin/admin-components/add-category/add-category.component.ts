import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder,ReactiveFormsModule, FormsModule, Validators, FormGroup } from '@angular/forms';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { AdminService } from '../../admin-services/admin.service';
import { NzMessageService } from 'ng-zorro-antd/message';
@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, NzFormModule,ReactiveFormsModule ,NzButtonModule, FormsModule ,NzInputModule,NzGridModule],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss'
})
export class AddCategoryComponent {
    constructor(private fb: FormBuilder, private service:AdminService, private message : NzMessageService) {}
    selectedFile? : File | null;
    imagePreview?: string | ArrayBuffer | null;

    

     //form group para el formulario de categoria 
      /*get name() { return this.formUser.controls['name']; }//hace que el formulario se sincronice con los valores de estas variables
  get email() { return this.formUser.controls['email']; }*/
      categoryForm = this.fb.group({
        name: ['', [Validators.required]],
        description: ['', [Validators.required]],
      });

      postCategory(){
        console.log(this.categoryForm.value);
        const formData: FormData = new FormData();
        formData.append('name', this.categoryForm.get('name')?.value!);
        formData.append('description', this.categoryForm.get('description')?.value!);
        formData.append('img', this.selectedFile!);
        this.service.postCategory(formData).subscribe((data:any)=>{
          console.log('Respuesta category del servidor: \n')
          console.log(data);
          if(data.id!=null){
            this.message.success('Categoria creada exitosamente', {nzDuration: 5000});
          }else{
            this.message.error('No se ha podido crear la categoria', {nzDuration: 5000});
          }
        });
      };

      onFileSelected(event:any) { //seleccionar imagen
        this.selectedFile = event.target.files[0]; //selecciona el archivo
        this.previewImage(); //previsualiza la imagen
      }

      previewImage() { //previsualizar imagen
        const reader = new FileReader();
        reader.onload = () => {
          this.imagePreview = reader.result;
        };
        
        reader.readAsDataURL(this.selectedFile!); // lee el archivo y lo convierte en una url para previsualizarlo
      }
    
}
