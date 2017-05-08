package br.com.projetoEstagio.service;

import java.util.List;

import org.json.JSONArray;

import br.com.projetoEstagio.entity.UnidadeEnsino;
import br.com.projetoEstagio.jpa.UnidadeEnsinoJPA;

public class UnidadeEnsinoService {

	public Object addUnidadeEnsino(UnidadeEnsino uni) {
		UnidadeEnsinoJPA user = new UnidadeEnsinoJPA();
		user.addUnidadeEnsino(uni);
		return user;
	}
	
	public List<UnidadeEnsino> listUnidade() throws Exception {
		UnidadeEnsinoJPA listUnidade = new UnidadeEnsinoJPA();
		return listUnidade.list();
	}
	
	public void deleteUnidade(JSONArray unid) throws Exception{
		UnidadeEnsinoJPA uni = new UnidadeEnsinoJPA();
		/*String abc = (String) unid.get(0);
		String[] unidade = abc.split(",");
		for (int i = 0; i < unidade.length; i++) {
			long w = Long.parseLong(unidade[i]);
		
						
			uni.deleteUnidadeEnsino(unid); */
			

			String[] unidade;
			for (int i = 0; i < unid.length(); i++) {
				
				long w = Long.parseLong(unid);
			
						
				uni.deleteUnidadeEnsino(w);
			
		}
		
		
	}

}