import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global'


@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css'],
  providers: [ProjectService, UploadService]
})
export class CreateComponent implements OnInit {

	public title: string;
	public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public saved_project;

  constructor(
    private _projectService: ProjectService,
  	private _uploadService: UploadService
  ) {

  	this.title = "Crear Proyecto";
  	this.project = new Project('', '', '', 2018, '', '', '');
   }

  ngOnInit() {
  }

  onSubmit(form){
  	console.log(this.project);

    //Guardar el proyecto
    this._projectService.saveProject(this.project).subscribe(
        response => {
          if (response.project) {

            //Guarda la imagen
            if (this.filesToUpload.length){
              this._uploadService.makeFileRequest(
                                  Global.url + 'upload-image/'+response.project._id,
                                  [],
                                  this.filesToUpload,
                                  'image'
                              )
                    .then((result:any) => {
                        this.status = 'success';
                        this.saved_project = result.project;
                        form.reset();
                    })
                    .catch((result:any) => {
                        console.log(result);
                    });
            }
            


          } else {
            this.status = 'failed';
          }
        },

        error => {
          console.log(<any>error);
        }
     );
  }

  fileChangeEvent(fileInput: any){
    this.filesToUpload = <Array<File>>fileInput.target.files;
  }

}
