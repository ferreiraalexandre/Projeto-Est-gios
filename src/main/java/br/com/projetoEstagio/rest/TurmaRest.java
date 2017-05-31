package br.com.projetoEstagio.rest;

import java.util.List;

import javax.ws.rs.Consumes;
import javax.ws.rs.DELETE;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.PUT;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.Response;

import org.json.JSONArray;

import br.com.projetoEstagio.entity.Usuario;
import br.com.projetoEstagio.restUtil.UtilRest;
import br.com.projetoEstagio.service.UsuarioService;

@Path("/turma")
public class TurmaRest extends UtilRest {
		
	public TurmaRest() {
	}
	
	@POST
	@Path("/salva")
	@Consumes("application/json")
	@Produces("application/json")
	public Response salva( String json){

		try{
			UsuarioService service = new UsuarioService(); 
			Usuario usuario = getObjectMapper().readValue(json, Usuario.class);
										
			return getResponseAdd(service.addUsuario(usuario));
		}catch(Exception e){
			return getResponseError(e);
		}
	}
	
	@GET
	@Path("/buscar")
	@Produces("application/json")
	public Response list() {
		
		try{
			UsuarioService service = new UsuarioService(); 

			List<Usuario> e = service.listUsuario();

			return getResponseList(e);
		} catch (Exception e) {
			return getResponseError(e);
		}
	}
	@DELETE
	@Path("/deletar/{id}")
	@Consumes("application/json")
	@Produces("application/json")
	public Response delete(@PathParam ("id") JSONArray id) {

		try{
			UsuarioService service = new UsuarioService(); 

			return getResponseRemove(service.deleteUsuario(id));
		} catch (Exception e) {
			return getResponseError(e);
		}
	}

	@PUT
	@Path("/editar")
	@Produces("application/json")
	public Response editar(String json) {

		try{
			Usuario usu = getObjectMapper().readValue(json, Usuario.class);
			
			UsuarioService service = new UsuarioService(); 
					
			return getResponseEdit(service.editarUsuario(usu));
		}catch(Exception e){
			return getResponseError(e);
		}
	}
	
}

