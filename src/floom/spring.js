define([
	"floom/material",
	"floom/particle",
	"floom/group",
	"floom/node",
	"floom/obstacle",
	"floom/system"
], function(
	Material,
	Particle,
	Group,
	Node,
	Obstacle,
	System
) {
	var Spring = function(particle1, particle2, restLength) {
		this.particle1 = particle1;
		this.particle2 = particle2;
		this.restLength = restLength;
		this.currentDistance = 0;
	};
	
	Spring.prototype.update = function() {
		this.currentDistance = this.particle1.position.distance(this.particle2.position);
	};
	
	Spring.prototype.solve = function() {
		var p2position = this.particle2.position;
		var p1position = this.particle1.position;
		var rij = p2position.sub(p1position);
		rij.mulFloatSelf(1 / this.currentDistance);
		var D = this.particle1.material.springK * (this.restLength - this.currentDistance);
		rij.mulFloatSelf(D * 0.5);
		p1position.subSelf(rij);
		p2position.addSelf(rij);
	};
	
	Spring.prototype.contains = function(particle) {
		return this.particle1 === particle || this.particle2 === particle;
	};
	
	return Spring;
});
