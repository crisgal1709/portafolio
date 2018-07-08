import { Component, OnInit } from '@angular/core';
import { Project } from '../../models/project';
import { ProjectService } from '../../services/project.service';
import { UploadService } from '../../services/upload.service';
import { Global } from '../../services/global'
import { Router, ActivatedRoute, Params } from '@angular/router'


@Component({
  selector: 'app-edit',
  templateUrl: '../create/create.component.html',
  styleUrls: ['./edit.component.css'],
  providers: [ProjectService, UploadService]
})
export class EditComponent implements OnInit {

  public title: string;
  public project: Project;
  public status: string;
  public filesToUpload: Array<File>;
  public saved_project;
  public url: string;

  constructor(
    private _projectService: ProjectService,
  	private _uploadService: UploadService,
  	private _router: Router,
  	private _route: ActivatedRoute,
  ) {

  	this.title   = "Editar Proyecto";
  	this.url = Global.url;
   }

  ngOnInit() {
  	this._route.params.subscribe(params => {
  		this.getProject(params.id);
  	});
  }

  getProject(id){

  	this._projectService.getProject(id).subscribe(
  		response => {
  			this.project = response.project;
  		},

  		error => {
  			console.log(<any>error);
  		}
  	);
  }

  onSubmit(form){
  	console.log(this.project);

    //Guardar el proyecto
    this._projectService.updateProject(this.project).subscribe(
        response => {
          if (response.project) {

            //Guarda la imagen
            if (this.filesToUpload.length) {
            	this._uploadService.makeFileRequest(
                                  Global.url + 'upload-image/'+response.project._id,
                                  [],
                                  this.filesToUpload,
                                  'image'
                              )
                    .then((result:any) => {
                        this.status = 'success';
                        this.saved_project = result.project;
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
