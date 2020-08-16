function link(parent, _args, context) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).link();
}

function user(parent, _args, context) {
  return context.prisma.vote.findOne({ where: { id: parent.id } }).user();
}

module.exports = {
  link,
  user,
};
